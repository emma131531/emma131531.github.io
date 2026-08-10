# -*- coding: utf-8 -*-
import os

def pcard(img,name,desc,tag=None):
    t='<span class="product-tag">'+tag+'</span>' if tag else ''
    return f'''<div class="product-card fade-in">
<div class="product-image"><img src="images/{img}" alt="{name}" loading="lazy"></div>
<div class="product-overlay"><p class="product-overlay-text">点击咨询</p></div>
<div class="product-info">
<h3 class="product-name">{name}</h3>
<p class="product-desc">{desc}</p>
{t}
</div>
</div>'''

tabs = [
    ('company','公司简介'),
    ('custom','定制SPECIAL'),
    ('destiny','天命废女'),
    ('five-elements','五行磁场'),
    ('love','爱情桃花'),
    ('protection','护佑避灾'),
    ('wealth','聚财护财'),
    ('spirit','灵气陪伴'),
    ('zodiac','星座能量'),
    ('report','行业报告'),
    ('popular','流行前沿'),
]

nav_items=''
mobile_items=''
for tid,zh in tabs:
    active='active'if tid=='company'else''
    nav_items += '<button class="tab-btn '+active+'" data-tab="'+tid+'" onclick="switchTab(\''+tid+'\',this)">'+zh+'</button>\n'
    mobile_items += '<button class="'+active+'" data-tab="'+tid+'" onclick="switchTab(\''+tid+'\',this)">'+zh+'</button>\n'

company_panel = '''
<div id="tab-company" class="tab-panel active">
<div class="tab-padding">
<div class="brand-intro-wrap fade-in visible">
<div class="intro-header">
<div class="cat-number">公司简介 / BRAND INTRODUCTION</div>
<h1 class="intro-big-title">财气珠宝店 · 东方玉道，财气共生</h1>
<p class="intro-subtitle">紫道丹焰（海口）智能科技有限公司 旗下珠宝品牌</p>
</div>
<div class="intro-text-block">
<p>财气珠宝店是紫道丹焰（海口）智能科技有限公司珠宝业务线上店铺，主营翡翠、和田玉、珍珠、水晶、南红、碧玺、非洲翠等各类珠宝，可结合顾客审美和能量场为用户进行高端定制，也拥有批量化珠宝产品，口碑出众，一直备受消费者喜爱。品牌跟随时代脚步，开始布局线上全域渠道，先后入驻淘宝、微信、抖音、小红书四大平台，以"财气珠宝店"为店铺品牌名，打造"线上品鉴 + 线下体验 + 私人定制"的全链路服务模式：</p>
</div>
<div class="intro-channel-box">
<h4>线上全域服务渠道</h4>
<ul>
<li><strong>1. 淘宝：</strong>搜索店铺"财气珠宝大促店支持私人定制"，专属你的翡翠臻品，匠心打造独一无二的腕间风华；</li>
<li><strong>2. 微信：</strong>搜索店铺"财气珠宝店"，一键下单，财气和开心幸福速达；</li>
<li><strong>3. 抖音：</strong>搜索店铺"财气珠宝店紫道丹焰公司"，近距离感受高冰沙岛绿的绝美质感，福利不停；</li>
<li><strong>4. 小红书：</strong>搜索店铺"财气珠宝店 - 紫道丹焰公司"，看高清实拍、真实买家秀，解锁更多佩戴与收藏干货。</li>
</ul>
</div>
<div class="intro-note-box">注意：因需要质检，请能等15天发货的粉丝下单购买。各大平台不定时特价半天捡漏活动，关注店铺后留言客服有额外优惠。</div>
<div class="intro-text-block">
<p>产品在批量制造珠宝产品的基础上，全面深化私人定制服务，依托紫道丹焰公司设计团队，为客户提供专属玉石雕刻、款式设计、刻字纪念等定制方案，满足高端收藏、礼赠传承、个人佩戴、追求个性化的多元需求。附带权威珠宝检测证书，支持全国复检，确立 "假一赔三、终身保养" 的服务标准，成为消费者信赖的玉石保真品牌。</p>
<p>在高端定制方面，深耕天然 A 货翡翠、和田玉等领域，集原石甄选、设计雕琢、定制销售、文化传播于一体。品牌以 "东方玉道，财气共生" 为核心理念，将千年玉石文化与当代财运气脉深度融合，打造兼具佩戴美学、收藏价值与祥瑞寓意的传世珠宝。旗下产品覆盖手镯、吊坠、手串、摆件等全品类，以高冰翡翠、羊脂玉等稀缺材质为核心，为千万用户提供保真、可鉴、可传的高端玉石臻品，是国内影响力深入与口碑传播广的财玉文化品牌。</p>
</div>
<div class="intro-contact-box">
<div class="intro-contact-item">
<h5>联系邮箱 / EMAIL</h5>
<p>heshangrong@outlook.com</p>
</div>
<div class="intro-contact-item">
<h5>微信客服 / WECHAT</h5>
<p>cdcdc13513</p>
</div>
</div>
</div>
</div>
</div>
'''

custom_inner = '''
<div class="cat-header fade-in">
<div class="cat-number">01 / 定制SPECIAL · 个性珠宝</div>
<h2 class="cat-title">定制SPECIAL · 个性珠宝</h2>
<p class="cat-story">每一颗翡翠都有它的主人。高冰翡翠，通透如冰，绿意深邃，是天地间亿万年凝结的灵气结晶。为你量身定制，将你的生辰、命格、心愿融入设计，打造独一无二的命运之石。</p>
</div>
<div class="product-grid">'''+pcard("feicui.png","高冰翡翠手镯","冰种翡翠，通透如水，绿意内敛。佩戴者气场清透，运势亨通，是聚财纳福的上品灵石。","私人定制")+'''</div>
'''

destiny_inner = '''
<div class="novel-header fade-in">
<div class="cat-number">02 / 《天命废女想说不》</div>
<h2 class="cat-title-gradient">《天命废女想说不》女主珠宝</h2>
<div class="novel-synopsis"><p>龙女在轮回千载后，终于熬到了觉醒前的最后一世。最后一世的人生，试图重新掌控自己的人生？敬请期待。</p></div>
<p class="novel-jewelry-label">微微喜欢的珠宝首饰</p>
</div>
<div class="product-grid">
'''+pcard("feicui.png","高冰翡翠手镯","微微贴身佩戴，灵气护体")+pcard("nanhong.jpg","南红吊坠","南红玛瑙，辟邪招财")+pcard("jiuzili.jpg","和田玉烟紫手串","九紫离火，运势加身")+pcard("qingshui.jpg","和田玉晴水手串","晴水渐变，温润如玉")+pcard("hulu.jpg","非洲翠葫芦吊坠","葫芦纳福，福禄双全")+pcard("biyu.jpg","和田玉碧玉项链","碧玉温润，平安喜乐")+pcard("bixi.jpg","碧玺项链手串","碧玺多彩，招财纳福")+'''
</div>
'''

fe_inner = '''
<div class="cat-header fade-in">
<div class="cat-number">03 / 五行磁场增强</div>
<h2 class="cat-title">五行磁场增强</h2>
<p class="cat-story">金木水火土，五行相生相克。根据你的生辰命理，匹配对应的宝石五行属性，增强个人磁场，调和阴阳平衡，让运势如江河奔涌、生生不息。</p>
</div>
<div class="product-grid">
'''+pcard("biyuyuanzhu.png","碧玉圆珠手串","碧玉属木，生机勃勃，圆珠聚气，磁场增强","五行属木")+pcard("biyu.jpg","和田碧玉吊坠","和田碧玉，温润养人，木气充盈","五行属木")+pcard("nanhong.jpg","南红玛瑙手串","南红属火，火旺运通，辟邪招财","五行属火")+pcard("pearl-necklace.jpg","珍珠项链","珍珠属水，水润生财，珠圆玉润","五行属水")+'''
</div>
'''

love_inner = '''
<div class="cat-header fade-in">
<div class="cat-number">04 / 爱情桃花朵朵开</div>
<h2 class="cat-title">爱情桃花朵朵开</h2>
<p class="cat-story">粉色系宝石，天然蕴含桃花能量。粉水晶招来真爱，碧玺锁住情缘。佩戴于心轮位置，激活爱的频率，让桃花运如花般绽放，命中注定的那个人，正在向你走来。</p>
</div>
<div class="product-grid">
'''+pcard("bixi.jpg","碧玺手串","碧玺色彩斑斓，增强个人魅力，吸引异性缘，锁住爱情不流失","桃花必备")+pcard("fenshuijing.jpg","粉水晶","粉水晶乃爱情之石，散发柔和粉光，催旺桃花运，招来命中注定的姻缘","招桃花")+'''
</div>
'''

prot_inner = '''
<div class="cat-header fade-in">
<div class="cat-number">05 / 护佑避灾</div>
<h2 class="cat-title">护佑避灾</h2>
<p class="cat-story">葫芦者，福禄也。非洲翠葫芦吊坠，形似天地之器，上吞天罡之气，下纳地煞之浊。佩戴者邪不可侵，灾不可近，福禄随身，平安一世。</p>
</div>
<div class="product-grid">'''+pcard("hulu.jpg","非洲翠葫芦吊坠","非洲翠精雕葫芦造型，葫芦谐音福禄。葫芦一挂，邪祟不怕。辟邪化煞，保平安，招福禄，是护身之首选","辟邪化煞")+'''</div>
'''

wealth_inner = '''
<div class="cat-header fade-in">
<div class="cat-number">06 / 聚财护财</div>
<h2 class="cat-title">聚财护财</h2>
<p class="cat-story">黄水晶被誉为财富之石，散发太阳般金光，招财进宝；和田玉温润如脂，守财不漏。一聚一守，财源广进，富甲一方。</p>
</div>
<div class="product-grid">
'''+pcard("huangshuijing.jpg","黄水晶手串","黄水晶乃商人之石，对应太阳神经丛，增强财运磁场，招偏财、聚正财，生意人必备","招财进宝")+pcard("hetianyu.jpg","和田玉手串","和田玉千年传承，温润养人，君子比德于玉。守财聚气，福泽绵长，传家之宝","守财聚气")+'''
</div>
'''

spirit_inner = '''
<div class="cat-header fade-in">
<div class="cat-number">07 / 灵气陪伴</div>
<h2 class="cat-title">灵气陪伴</h2>
<p class="cat-story">晴水渐变，如山间清晨的雾气，如雨后初晴的天光。佩戴者心如止水，灵气充盈，每一天都有温暖陪伴，每一刻都觉人间值得。</p>
</div>
<div class="product-grid">'''+pcard("qingshui.jpg","和田玉晴水手串","晴水渐变色，从乳白到浅青，如晨曦微露。灵性温和，陪伴左右，安抚焦躁，带来内心的宁静与欢喜","灵性陪伴")+'''</div>
'''

zodiac_inner = '''
<div class="cat-header fade-in">
<div class="cat-number">08 / 星座能量提升</div>
<h2 class="cat-title">星座能量提升</h2>
<p class="cat-story">十二星座，各有守护之石。石榴石燃热情，紫水晶启智慧，祖母绿招贵人，红宝石燃斗志，黑曜石挡小人。找到你的星座本命石，让星光照亮命运之路。</p>
</div>
<div class="product-grid">
'''+pcard("shiliushi.jpg","石榴石手串","石榴石深红如火，激发生命热情，增强活力与自信，适合白羊座、狮子座","火象星座")+pcard("zishuijing.jpg","紫水晶","紫水晶高贵神秘，开启第三眼，提升直觉与灵性，适合水瓶座、双鱼座","风象星座")+pcard("zumulv.jpg","祖母绿","祖母绿翠绿如春，五大贵宝石之一，招贵人、旺事业，适合金牛座、巨蟹座","土象星座")+pcard("ruby-ring.jpg","红宝石戒指","红宝石炙热如血，王者之石，激发斗志与勇气，适合白羊座、天蝎座","火象星座")+pcard("lvshuijing.png","绿水晶","绿水晶正财之石，招正财、旺事业，适合处女座、摩羯座","土象星座")+pcard("lanshuijing-ring.jpg","蓝水晶戒指","蓝水晶宁静深邃，增强沟通与表达，适合双子座、天秤座","风象星座")+pcard("heiyaoshi.jpg","黑曜石手串","黑曜石佛教七宝之一，强力辟邪挡小人，净化负能量，适合所有星座","通用辟邪")+'''
</div>
'''

report_inner = '''
<div class="report-wrap fade-in">
<div class="report-header">
<div class="cat-number">09 / 行业白皮书</div>
<h2 class="report-title">珠宝行业白皮书</h2>
<p class="report-meta">全球市场趋势与中国机遇（2024-2025年度报告）</p>
</div>
<div class="report-toc">
<h3>目录</h3>
<ul>
<li>第一章 全球珠宝市场全景分析</li>
<li>第二章 中国珠宝市场深度洞察</li>
<li>第三章 消费者行为洞察</li>
<li>第四章 行业竞争格局</li>
<li>第五章 技术创新应用</li>
<li>第六章 可持续发展战略</li>
<li>第七章 商业策略建议</li>
</ul>
</div>
<div class="report-content">
<h3>第一章 全球珠宝市场全景分析</h3>
<h4>1.1 全球珠宝市场规模与增长趋势</h4>
<p>根据世界黄金协会(WGC)与Euromonitor最新数据：</p>
<table>
<tr><th>指标</th><th>2023年</th><th>2024年预测</th><th>年增长率</th></tr>
<tr><td>全球珠宝市场规模</td><td>3,400亿美元</td><td>3,750亿美元</td><td>+10.3%</td></tr>
<tr><td>黄金珠宝占比</td><td>52%</td><td>51%</td><td>-1pp</td></tr>
</table>
<p><strong>关键趋势：</strong></p>
<ul>
<li>全球珠宝市场连续三年保持8%以上增速</li>
<li>新兴市场贡献超过60%的增量</li>
<li>轻奢珠宝增速领先传统珠宝</li>
</ul>
<h4>1.2 2024-2025年市场预测</h4>
<p>全球珠宝市场增长驱动力：经济复苏与消费者信心恢复、婚庆市场回暖、可持续消费理念普及、新兴市场中产阶级扩大。</p>

<h3>第二章 中国珠宝市场深度洞察</h3>
<h4>2.1 市场规模与增速分析</h4>
<p>根据中国珠宝玉石首饰行业协会(GJC)数据：</p>
<table>
<tr><th>年份</th><th>市场规模(亿元)</th><th>同比增速</th></tr>
<tr><td>2021</td><td>7,200</td><td>+18.1%</td></tr>
<tr><td>2022</td><td>8,000</td><td>+11.1%</td></tr>
<tr><td>2023</td><td>8,800</td><td>+10.0%</td></tr>
<tr><td>2024</td><td>9,600</td><td>+9.1%</td></tr>
</table>
<h4>2.2 线上渠道发展趋势</h4>
<table>
<tr><th>渠道</th><th>2023年占比</th><th>2024年预测</th></tr>
<tr><td>线下门店</td><td>65%</td><td>60%</td></tr>
<tr><td>电商平台</td><td>25%</td><td>28%</td></tr>
</table>

<h3>第三章 消费者行为洞察</h3>
<h4>3.1 消费动机与偏好演变</h4>
<p><strong>购买动机变化：</strong></p>
<ul>
<li>投资保值：从45%下降到32%</li>
<li>情感表达：从30%上升到38%</li>
<li>自我奖励：从15%上升到22%</li>
<li>社交展示：从10%下降到8%</li>
</ul>

<h3>第四章 行业竞争格局</h3>
<h4>4.1 主要品牌市场份额</h4>
<table>
<tr><th>品牌类型</th><th>代表品牌</th><th>份额</th><th>特点</th></tr>
<tr><td>国际奢侈品牌</td><td>蒂芙尼、卡地亚、宝格丽</td><td>15%</td><td>高端定位，品牌溢价高</td></tr>
<tr><td>港资品牌</td><td>周大福、周生生、谢瑞麟</td><td>20%</td><td>渠道优势明显</td></tr>
<tr><td>内地品牌</td><td>老凤祥、周大生、中国黄金</td><td>35%</td><td>本土深耕，性价比突出</td></tr>
<tr><td>电商品牌</td><td>钻石小鸟、珂兰、Blue Nile</td><td>10%</td><td>线上渠道为主，价格透明</td></tr>
<tr><td>设计师品牌</td><td>独立设计师、小众品牌</td><td>10%</td><td>差异化，设计驱动</td></tr>
</table>
<h4>4.2 新兴品牌崛起路径</h4>
<p><strong>成功要素：</strong></p>
<ul>
<li>细分市场定位：专注某一品类或客群</li>
<li>内容营销能力：社交媒体种草能力</li>
<li>供应链创新：柔性生产与快速响应</li>
<li>数据驱动运营：精准营销与用户运营</li>
</ul>

<h3>第五章 技术创新应用</h3>
<h4>区块链溯源应用实践</h4>
<p><strong>技术价值：</strong></p>
<ul>
<li>宝石来源可追溯</li>
<li>鉴定证书数字化</li>
<li>消费者信任提升</li>
</ul>
<p>案例：高端品牌推出区块链溯源系统，消费者可扫码查看宝石从开采到加工的全流程信息，产品复购率提升18%。</p>

<h3>第六章 可持续发展战略</h3>
<p><strong>行业ESG重点：</strong></p>
<ul>
<li>环境：负责任开采、低碳生产</li>
<li>社会：公平贸易、员工福利</li>
<li>治理：透明运营、合规管理</li>
</ul>

<h3>第七章 商业策略建议</h3>
<h4>7.1 产品策略优化方向</h4>
<p>场景化+可持续产品系列</p>
<h4>7.2 渠道创新路径</h4>
<p>私域运营和内容电商</p>
<h4>7.3 品牌升级建议</h4>
<ul>
<li>品牌故事重构</li>
<li>数字化品牌建设</li>
<li>消费者教育</li>
</ul>

<p class="quote-block">"可持续发展不仅是社会责任，更是商业机遇。消费者对可持续珠宝的需求正在快速增长。" —— 珠宝行业资深分析师</p>
</div>
</div>
'''

pop_inner = '''
<div class="cat-header fade-in">
<div class="cat-number">10 / 流行前沿珠宝</div>
<h2 class="cat-title">流行前沿珠宝</h2>
<p class="cat-story">来自《天命废女想说不》女主微微的珠宝首饰精选。每一件都是当下最流行的珠宝款式，结合玄学能量加持，让美丽与运势同行。</p>
</div>
<div class="product-grid">
'''+pcard("feicui.png","高冰翡翠手镯","流行经典 · 聚财护体")+pcard("nanhong.jpg","南红吊坠","流行热款 · 辟邪招财")+pcard("jiuzili.jpg","和田玉烟紫手串","流行新宠 · 九紫离火运")+pcard("qingshui.jpg","和田玉晴水手串","流行爆款 · 灵气陪伴")+pcard("hulu.jpg","非洲翠葫芦吊坠","流行吉祥 · 福禄双全")+pcard("biyu.jpg","和田玉碧玉项链","流行雅致 · 平安喜乐")+pcard("bixi.jpg","碧玺项链手串","流行多彩 · 招财纳福")+'''
</div>
'''

html = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>财气珠宝店 · 紫道丹焰 | Fortune Jewelry</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>

<section class="hero">
<div class="hero-bg"></div>
<div class="hero-particles"></div>
<div class="hero-content">
<h1 class="hero-title">财气珠宝店 · 紫道丹焰</h1>
<p class="hero-subtitle">每一颗珠宝，都是命运的馈赠</p>
<p class="hero-desc">玄学珠宝 · 能量加持 · 灵性守护 · 聚财纳福</p>
<button class="hero-cta" onclick="enterApp()">开启你的珠宝之旅</button>
</div>
<div class="scroll-indicator">▼</div>
</section>

<div class="main-app">
<header class="app-header">
<div class="app-header-inner">
<div class="app-logo" onclick="backToHero()" title="返回首页">
<div class="app-logo-icon">财</div>
<div class="app-logo-text">
<div class="main">财气珠宝店</div>
<div class="sub">紫道丹焰 · 线上全域</div>
</div>
</div>
<nav class="app-nav">
<div class="app-nav-tabs">'''+nav_items+'''</div>
</nav>
<div style="display:flex;align-items:center;gap:14px;flex-shrink:0">
<button class="lang-toggle" onclick="toggleLang()">EN</button>
<button class="mobile-menu-btn" onclick="document.querySelector('.mobile-drawer').classList.toggle('open')">☰</button>
</div>
</div>
</header>

<div class="mobile-drawer">
'''+mobile_items+'''
</div>

<main class="tab-content-wrap">
'''+company_panel+'''
<div id="tab-custom" class="tab-panel"><div class="tab-padding">'''+custom_inner+'''</div></div>
<div id="tab-destiny" class="tab-panel"><div class="tab-padding">'''+destiny_inner+'''</div></div>
<div id="tab-five-elements" class="tab-panel"><div class="tab-padding">'''+fe_inner+'''</div></div>
<div id="tab-love" class="tab-panel"><div class="tab-padding">'''+love_inner+'''</div></div>
<div id="tab-protection" class="tab-panel"><div class="tab-padding">'''+prot_inner+'''</div></div>
<div id="tab-wealth" class="tab-panel"><div class="tab-padding">'''+wealth_inner+'''</div></div>
<div id="tab-spirit" class="tab-panel"><div class="tab-padding">'''+spirit_inner+'''</div></div>
<div id="tab-zodiac" class="tab-panel"><div class="tab-padding">'''+zodiac_inner+'''</div></div>
<div id="tab-report" class="tab-panel"><div class="tab-padding">'''+report_inner+'''</div></div>
<div id="tab-popular" class="tab-panel"><div class="tab-padding">'''+pop_inner+'''</div></div>
</main>

<footer>
<div class="footer-grid">
<div class="footer-col">
<h4>关于财气珠宝店</h4>
<p>财气珠宝店是紫道丹焰（海口）智能科技有限公司珠宝业务线上店铺，品牌以"东方玉道，财气共生"为核心理念，将千年玉石文化与当代财运气脉深度融合，为千万用户提供保真、可鉴、可传的高端玉石臻品。</p>
</div>
<div class="footer-col">
<h4>品牌门店</h4>
<p>淘宝店铺：财气珠宝大促店支持私人定制</p>
<p>微信店铺：财气珠宝店</p>
<p>抖音店铺：财气珠宝店紫道丹焰公司</p>
<p>小红书店铺：财气珠宝店-紫道丹焰公司</p>
</div>
<div class="footer-col">
<h4>联系我们</h4>
<p>联系邮箱：heshangrong@outlook.com</p>
<p>微信客服：cdcdc13513</p>
<p>各大平台搜索店铺即可找到我们</p>
</div>
</div>
<div class="footer-bottom">
<p>© 2026 紫道丹焰（海口）智能科技有限公司 · 财气珠宝店 | 晨轩贺 版权所有</p>
</div>
</footer>
</div>

<script src="script.js"></script>
</body>
</html>'''

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('HTML OK,', round(len(html)/1024,1), 'KB')
