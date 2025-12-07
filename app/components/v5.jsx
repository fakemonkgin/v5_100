'use client'

import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle2, BookOpen, Award, Zap, Search } from 'lucide-react';

const qaData = [
  { q: "项目会改变团队考核机制吗？", a: "权限丢弃后，机制由链上代码固定，不可篡改。", category: "基础规则" },
  { q: "节点分红是分U还是分币？", a: "分币，由合约自动卖成U。", category: "节点相关" },
  { q: "LP权限丢弃后，0x000000000和0x0000000dead两个黑洞地址哪个更安全？", a: "本质均为黑洞地址，私钥几乎无法破解，安全性无差异。", category: "安全保障" },
  { q: "现在有V5代币了吗？", a: "V5代币是长期规划的DEX平台币，目前未上线。", category: "代币信息" },
  { q: "单币质押的利率是多少？", a: "底池大于1500万U后启动，利率根据平台盈利分配，暂无具体数值公告。", category: "质押收益" },
  { q: "做团队的话，收益包括大小区吗？", a: "收益包括大小区，业绩考核仅考核小区。", category: "团队收益" },
  { q: "下线超越级别还会有动态奖金吗？", a: "超过你的级别则无法享受动态奖金。", category: "团队收益" },
  { q: "确定节点身份的NFT转移其他钱包是不是权益转移？", a: "是的。", category: "节点相关" },
  { q: "盈利税10%的多少比例用于节点分红？", a: "10%盈利税中30%用于节点分红，剩余70%作为USDN价值储备。", category: "节点相关" },
  { q: "动态奖金是等下线涡轮解锁后才拿得到吗？", a: "是的。", category: "团队收益" },
  { q: "动态奖金会自动去到TP钱包还是系统里？", a: "涡轮解锁后自动转入TP钱包。", category: "团队收益" },
  { q: "平级奖励是来自静态收益的10％吗？", a: "来自动态收益的10％。", category: "团队收益" },
  { q: "是U进U出吗？", a: "是的，无需承担市场波动风险。", category: "基础规则" },
  { q: "合约地址都是公开的吗？", a: "是的。", category: "安全保障" },
  { q: "质押期间的利润可以提吗？", a: "不可以，利润会自动复利。", category: "质押收益" },
  { q: "为什么LP池子中有四个地址，其他没锁定黑洞的LP地址后续是否会锁入黑洞？", a: "第一个为黑洞地址，第二个是LP回流地址（定期打入黑洞），第三个是博饼官方税费地址。", category: "技术细节" },
  { q: "节点分红是怎么分的？", a: "等待官方公布具体细节。", category: "节点相关" },
  { q: "参与时43％的月化收益从何而来？", a: "享受LP价值增长及代币价格增长带来的价值扩张。", category: "质押收益" },
  { q: "为什么LP的数值和代币数值不同步？", a: "LP凭证和NAT代币凭证数量本身不同，数值无法完全同步。", category: "技术细节" },
  { q: "NAT会不会出现以前项目关网跑路的风险？", a: "不会，资金在底池永久锁死，所有操作通过合约自动执行，无法关网跑路。", category: "安全保障" },
  { q: "资金都在底池了，平台赚什么收益？", a: "赚取代币交易滑点手续费及未来生态发展收益。", category: "平台运营" },
  { q: "为什么每次登录都要签名验证？", a: "确保用户资产安全。", category: "安全保障" },
  { q: "如何确保平台是长久安全的？", a: "资金全部锁入底池，无人能动；全部链上执行，不受人为干扰；币价螺旋上涨，吸引用户持续进场。", category: "安全保障" },
  { q: "项目方是哪里的？", a: "属于去中心化赛道，权限丢弃后，项目方是否存在不影响项目运行。", category: "基础规则" },
  { q: "利润从哪里来？是不是前面人拿后面人的钱？", a: "参与一级做市商，资金进入底池为NAT提供流动性创造价值；最长质押30天一个循环，不存在前后人拿钱的情况。", category: "平台运营" },
  { q: "节点什么时候分币？", a: "拿到节点的用户先质押1000美金参与做市商，后续等待通知。", category: "节点相关" },
  { q: "什么时候开启第二阶段单币质押？必须参与吗？", a: "底池达1500万美金以上开启，不强迫参与，主要目的是鼓励持币。", category: "质押收益" },
  { q: "节点1500油，之后权益是平均分配还是加权分配？是否有另外考核？", a: "未明确说明分配方式，节点需持续质押1000美金，暂无其他额外考核说明。", category: "节点相关" },
  { q: "排队空单有没有业绩？后续入金算不算业绩？", a: "未明确说明排队空单是否算业绩，后续入金是否算业绩未提及。", category: "团队收益" },
  { q: "小推大或者入金，是按入金时间算推荐关系还是按架构算？", a: "未明确说明。", category: "团队收益" },
  { q: "个人业绩和小区业绩，小区业绩15天到5000油达S1，享受三十天周期收益，前15天未到5000，推荐的团队业绩怎么评判？", a: "未明确说明。", category: "团队收益" },
  { q: "关于自然资本有没有相对详细的介绍？", a: "未提供详细介绍。", category: "平台运营" },
  { q: "持币生息具体收益率是多少？", a: "未明确具体收益率，单币质押利率将根据平台盈利分配。", category: "质押收益" },
  { q: "平台币V5有没有基础的前景规划？", a: "V5为DEX平台币，未来生态应用、交易手续费将以其作为主要燃料，依托庞大流量体现价值。", category: "代币信息" },
  { q: "参与做市商，进场资金买币的1.5%交易税LP，剩余1.5%节点分红，参与LP的油少了3%，这3%去哪里了？怎么分配？", a: "买入手续费3%，1.5%进入底池，1.5%用于节点分红；卖出手续费3%用于技术支持相关支出。", category: "技术细节" },
  { q: "LP资金的U越来越多，会不会有一天砸盘跑路？", a: "不会，所有权限全部丢弃，合约写死，一切链上执行，资方盈利来自交易手续费，平台发展越大收益越多，实现资本与社区双赢。", category: "安全保障" },
  { q: "节点可不可以转让，未来有哪些价值？", a: "可以转让（NFT转移钱包即可）；全球仅2000席，平台发展后交易量增加，节点收益将提升，价值水涨船高。", category: "节点相关" },
  { q: "V5未来有哪些布局？", a: "底池达1500万美金开启单币质押、持币生息；后期将有发射台、DEX打造、永续合约、衍生品、swap、RWA等生态布局。", category: "平台运营" },
  { q: "V5海外社区主要有哪些？", a: "韩国、日本、泰国、新加坡、马来西亚、澳洲、老挝、西班牙等，数据持续更新。", category: "平台运营" },
  { q: "NAT的价格会涨到多少美金一枚？", a: "价格由共识决定，U池达2千万、币量打散至50万枚时，价格可达40美金，未来有望达100-200U以上。", category: "代币信息" },
  { q: "二级开放限制金额吗？还是可以随意交易？", a: "单账户每分钟最高买入1000U，可重复购买，防止大户一次性买入大量筹码。", category: "交易规则" },
  { q: "怎样在V5获得利益最大化（静态）？", a: "底池未达777万美金前，选择30天周期收益最高，出局后本利复投；达777万美金后，通过利润涡轮享受币价涨幅。", category: "投资策略" },
  { q: "平台怎么消泡？是否是前人赚后钱？", a: "泡沫来源于43%月化收益，通过一级做市商联合坐庄，利用流动性自动高抛低吸，弥补传统DeFi短板，到期本利同出，无前人赚后钱情况，依托共识推动币价螺旋上涨。", category: "平台运营" },
  { q: "节点质押的1000美金，1个月后当天提现，是否当天必须入金？", a: "是的，节点必须保证账户里有1000美金。", category: "节点相关" },
  { q: "V5目前是在哪一条公链上面？假设出现极端情况或后台无法正常开启，投资者资金安全如何保障？", a: "基于币安智能链；底池锁定、权限抛弃，投资者可直接通过公链赎回资产，完全去中心化。", category: "安全保障" },
  { q: "NAT的买卖是否有额外手续费或其他费用？", a: "买卖均有3%滑点费用，无其他额外扣费。", category: "交易规则" },
  { q: "V5的安全系数高不高？如何证明代码没有漏洞或BUG导致平台出现亏损？", a: "安全系数高；底层代码经全球前三审计机构审计，悬赏30万美金给发现漏洞者。", category: "安全保障" },
  { q: "社区奖励中是按照质押时等级还是解押时等级计算？", a: "统一按照解押时的等级来结算社区奖励。", category: "团队收益" },
  { q: "利润涡轮的430美金的NAT需要交盈利税吗？", a: "需要缴纳盈利税。", category: "交易规则" },
  { q: "ave上显示的LP比例为什么逐步在下降？baa3尾号是什么地址？9706尾号是什么地址？", a: "baa3组LP回流地址，管理权在baa3这里，USDN铸造紧急备用金；9706是薄饼的税费，税费的一部分返佣部分组的LP。", category: "技术细节" },
  { q: "ave上聪明钱和阴谋集团分别是什么意思？", a: "CK审计报告出来之后阴谋集团的部分会消失。", category: "技术细节" },
  { q: "CK审计报告大概什么时候出来？", a: "12月中旬。", category: "平台运营" },
  { q: "0x911406a71e10e37be3cc1c892439deae1c7c6fc3从上线开始一直都在卖出币，为什么？", a: "这个地址在累积100u的时候回流底池。", category: "技术细节" },
  { q: "ave上卖税显示100%", a: "显示问题。", category: "技术细节" },
  { q: "节点分红具体怎么分？何时分？权限谁掌握？", a: "基础分红和加权分红。", category: "节点相关" },
  { q: "节点分红钱包什么时候丢掉权限？多久分红一次？", a: "待官方公布。", category: "节点相关" },
];

export default function V5QAQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [particles, setParticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(qaData);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredData(qaData);
    } else {
      const filtered = qaData.filter(item => 
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
      setCurrentIndex(0);
      setShowAnswer(false);
    }
  }, [searchTerm]);

  const currentQ = filteredData[currentIndex];
  const progress = filteredData.length > 0 ? ((currentIndex + 1) / filteredData.length) * 100 : 0;

  const handleNext = () => {
    if (!completed.includes(currentIndex)) {
      setCompleted([...completed, currentIndex]);
    }
    if (currentIndex < filteredData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-stone-950 text-white overflow-hidden relative">
      {/* 背景粒子效果 - 金色和红色混合 */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute w-1 h-1 rounded-full opacity-40 animate-pulse ${
            p.id % 3 === 0 ? 'bg-red-500' : 'bg-amber-400'
          }`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* 金色光晕效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(251,191,36,0.15),transparent_50%)]" />
      {/* 红色光晕效果 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(220,38,38,0.1),transparent_50%)]" />
      
      {/* 网格叠加层 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* 头部 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/30 rounded-full px-6 py-2 mb-4 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm font-mono">V5 Knowledge Base</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-red-500 bg-clip-text text-transparent mb-2 drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]">
            V5项目百问百答
          </h1>
          <p className="text-amber-200/70">共 {qaData.length} 题 · 精简版问答</p>
        </div>

        {/* 搜索框 */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400/70" />
            <input
              type="text"
              placeholder="搜索问题、答案或分类..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-900/80 backdrop-blur-xl border border-amber-500/20 rounded-xl text-amber-50 placeholder-amber-200/40 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-amber-200/60 mt-2">
              找到 {filteredData.length} 个结果
            </p>
          )}
        </div>

        {/* 进度条 */}
        {filteredData.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-amber-400 font-mono">进度 {currentIndex + 1}/{filteredData.length}</span>
              <span className="text-red-400 font-mono">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-zinc-900/80 rounded-full overflow-hidden border border-amber-500/20 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 transition-all duration-500 ease-out relative shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* 主卡片 */}
        {filteredData.length > 0 ? (
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-8 shadow-2xl shadow-amber-900/20 mb-6 relative overflow-hidden">
            {/* 装饰性红色光效 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl"></div>
            
            {/* 分类标签 */}
            <div className="flex items-center gap-2 mb-6 relative z-10">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 text-sm font-semibold px-3 py-1 bg-gradient-to-r from-amber-500/10 to-red-500/5 rounded-full border border-amber-500/30 backdrop-blur-sm">
                {currentQ.category}
              </span>
            </div>

            {/* 问题 */}
            <div className="mb-8 relative z-10">
              <div className="flex items-start gap-4">
                <span className="text-5xl font-bold bg-gradient-to-br from-amber-400/20 to-red-500/20 bg-clip-text text-transparent font-mono">Q</span>
                <h2 className="text-2xl md:text-3xl font-bold text-amber-50 leading-relaxed pt-2">
                  {currentQ.q}
                </h2>
              </div>
            </div>

            {/* 答案区域 */}
            <div className="min-h-[200px] relative z-10">
              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-900/40 text-white"
                >
                  显示答案
                </button>
              ) : (
                <div className="animate-fadeIn">
                  <div className="flex items-start gap-4 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-red-500/10 border border-amber-500/30 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl"></div>
                    <span className="text-4xl font-bold bg-gradient-to-br from-amber-400/40 to-red-500/40 bg-clip-text text-transparent font-mono relative z-10">A</span>
                    <p className="text-lg text-amber-50 leading-relaxed pt-1 relative z-10">{currentQ.a}</p>
                  </div>
                  
                  <button
                    onClick={handleNext}
                    disabled={currentIndex >= filteredData.length - 1}
                    className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-900/50 flex items-center justify-center gap-2"
                  >
                    {currentIndex < filteredData.length - 1 ? (
                      <>
                        下一题 <ChevronRight className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        已完成 <CheckCircle2 className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-8 text-center">
            <p className="text-amber-200/60 text-lg">未找到匹配的问题</p>
          </div>
        )}

        {/* 导航 */}
        {filteredData.length > 0 && (
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-zinc-800/80 hover:bg-zinc-700/80 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 border border-amber-500/20 hover:border-red-500/30 text-amber-100 backdrop-blur-sm"
            >
              上一题
            </button>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-lg border border-amber-500/20 backdrop-blur-sm">
              <Award className="w-5 h-5 text-red-500" />
              <span className="text-amber-200/70">已完成: <span className="text-red-400 font-bold">{completed.length}</span></span>
            </div>
            
            <button
              onClick={handleNext}
              disabled={currentIndex >= filteredData.length - 1}
              className="px-6 py-3 bg-zinc-800/80 hover:bg-zinc-700/80 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 border border-amber-500/20 hover:border-red-500/30 text-amber-100 backdrop-blur-sm"
            >
              跳过
            </button>
          </div>
        )}

        {/* 完成提示 */}
        {filteredData.length > 0 && currentIndex === filteredData.length - 1 && showAnswer && (
          <div className="mt-8 p-6 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/30 rounded-xl text-center animate-fadeIn backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
            <Award className="w-12 h-12 text-amber-400 mx-auto mb-3 relative z-10" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-red-400 bg-clip-text text-transparent mb-2 relative z-10">恭喜完成所有题目！</h3>
            <p className="text-amber-200/80 relative z-10">你已经完成了 {filteredData.length} 道题目的学习</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}