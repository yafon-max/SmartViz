<template>
  <div class="home">
    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 封面区：展示项目标题和快捷按钮 -->
      <section class="hero-section">
        <div class="hero-card">
          <div class="hero-content">
            <!-- <h1 class="headline">智慧社区数据可视化展示</h1>-->
            <p class="subheadline">{{ t('home.introText') }}</p>
            
            <!-- 快捷导航按钮 -->
            <div class="action-buttons">
              <router-link to="/data" class="button primary">
                {{ t('app.nav.data') }}
              </router-link>
              <router-link to="/model" class="button secondary">
                {{ t('app.nav.model') }}
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- 项目介绍部分：展示研究背景、目标和技术方法 -->
      <section class="section project-intro-section">
        <h2 class="section-title">{{ t('home.projectIntro') }}</h2>
        
        <div class="cards-grid">
          <!-- 研究背景卡片 -->
          <div class="intro-card">
            <div class="intro-card-header">
              <div class="intro-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h3 class="intro-card-title">{{ t('home.researchBackground') }}</h3>
            </div>
            <div class="intro-card-content">
              <p>{{ t('home.backgroundText') }}</p>
              <p>{{ t('home.noticeText') }}</p>
            </div>
          </div>
          
          <!-- 研究目标卡片 -->
          <div class="intro-card">
            <div class="intro-card-header">
              <div class="intro-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                  <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                </svg>
              </div>
              <h3 class="intro-card-title">{{ t('home.researchGoal') }}</h3>
            </div>
            <div class="intro-card-content">
              <p>{{ t('home.goalText') }}</p>
            </div>
          </div>
          
          <!-- 技术方法卡片 -->
          <div class="intro-card">
            <div class="intro-card-header">
              <div class="intro-card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 class="intro-card-title">{{ t('home.technicalMethod') }}</h3>
            </div>
            <div class="intro-card-content">
              <p>{{ t('home.methodText') }}</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 团队介绍部分：展示项目团队成员和角色 -->
      <section class="section team-section">
        <h2 class="section-title">{{ t('home.team.title') }}</h2>
        <div class="team-container">
          <div class="network-wrapper">
            <div class="network-chart" ref="networkChart"></div>
            <!-- 移动到画布中下位置的缩放控制按钮 -->
            <div class="controls-container">
              <div class="controls-wrapper">
                <button @click="zoomIn" class="zoom-button" :title="t('home.team.zoomIn')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <button @click="zoomOut" class="zoom-button" :title="t('home.team.zoomOut')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <button @click="resetZoom" class="zoom-button" :title="t('home.team.reset')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="team-info">
            <div v-if="!selectedMember" class="team-info-card">
              <h3 class="team-info-title">{{ t('home.team.overview') }}</h3>
              <div class="team-info-content">
                <p class="team-info-paragraph" v-html="t('home.team.introduction')"></p>
                <div class="team-members-list">
                  <div class="team-member-item">
                    <div class="member-label">{{ t('home.team.supervisor') }}</div>
                    <div class="member-value">{{ t('home.team.supervisorName') }}</div>
                  </div>
                  <div class="team-member-item">
                    <div class="member-label">{{ t('home.team.members') }}</div>
                    <div class="member-value">{{ t('home.team.AllMemberNames') }}</div>
                  </div>
                  <div class="team-member-item">
                    <div class="member-label">{{ t('home.team.government') }}</div>
                    <div class="member-value">{{ t('home.team.governmentName') }}</div>
                  </div>
                </div>
                <div class="team-info-tips">
                  <div class="tip-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div class="tip-text">{{ t('home.team.tooltip') }}</div>
                </div>
              </div>
            </div>
            <div v-else class="member-card">
              <div class="member-header">
                <div class="member-avatar" :style="{ backgroundColor: getMemberColor(selectedMember) }">
                  {{ selectedMember.avatar }}
                </div>
                <div class="member-basic">
                  <h3>{{ selectedMember.name }}</h3>
                </div>
              </div>
              <div class="member-roles-container">
                <span v-for="(role, index) in selectedMember.roles" :key="index" 
                      class="role-tag" 
                      :style="{ backgroundColor: getRoleBackgroundColor(role), color: getRoleTextColor(role) }">
                  {{ role }}
                </span>
              </div>
              <div class="member-body">
                <p>{{ selectedMember.description }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 固定位置的工具提示 -->
        <div class="fixed-tooltip" v-show="showTooltip" :style="tooltipStyle">
          <div class="tooltip-content">
            <h4>{{ tooltipData.name }}</h4>
            <p>{{ tooltipData.role }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// 添加简单的交互动效
import { onMounted, ref, reactive, onUnmounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import * as d3 from 'd3';

// 获取i18n实例
const { t, locale } = useI18n();

// 网络图引用
const networkChart = ref(null);
const tooltipStyle = ref({
  left: '0px',
  top: '0px'
});
const showTooltip = ref(false);
const tooltipData = reactive({
  name: '',
  role: ''
});
const selectedMember = ref(null);

// 缩放控制变量
const currentZoom = ref(null);
const svgRef = ref(null);
const zoomGroup = ref(null);

// 添加ESC键监听器处理全屏模式
onMounted(() => {
  // 保留现有的onMounted代码
  
  // 添加ESC键监听
  document.addEventListener('keydown', handleKeyDown);
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});

// 处理键盘事件
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && isFullscreen.value) {
    toggleFullscreen();
  }
};

// 全屏切换
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
  
  if (isFullscreen.value) {
    // 全屏时重置视图
    resetZoom();
    document.body.style.overflow = 'hidden'; // 防止滚动
  } else {
    document.body.style.overflow = ''; // 恢复滚动
  }
};

// 缩放方法
const zoomIn = () => {
  if (svgRef.value && currentZoom.value) {
    svgRef.value.transition().duration(500).call(
      currentZoom.value.scaleBy, 1.3
    );
  }
};

const zoomOut = () => {
  if (svgRef.value && currentZoom.value) {
    svgRef.value.transition().duration(500).call(
      currentZoom.value.scaleBy, 0.7
    );
  }
};

const resetZoom = () => {
  if (svgRef.value && currentZoom.value) {
    svgRef.value.transition().duration(500).call(
      currentZoom.value.transform, d3.zoomIdentity
    );
  }
};

// 团队数据
const teamData = computed(() => {
  return {
    nodes: [
      // 角色节点
      { id: 'role1', name: t('home.team.roles.theoryGuidance'), type: 'role', group: 1 },
      { id: 'role2', name: t('home.team.roles.teamManagement'), type: 'role', group: 2 },
      { id: 'role3', name: t('home.team.roles.algorithmOptimization'), type: 'role', group: 3 },
      { id: 'role4', name: t('home.team.roles.dataCollection'), type: 'role', group: 4 },
      { id: 'role5', name: t('home.team.roles.technicalSupport'), type: 'role', group: 5 },
      { id: 'role6', name: t('home.team.roles.designRenovation'), type: 'role', group: 6 },
      { id: 'role7', name: t('home.team.roles.governmentSupport'), type: 'role', group: 7 },
      
      // 成员节点
      { id: 'member1', name: t('home.team.supervisorName'), type: 'member', group: 1, 
        roles: [
          t('home.team.roles.theoryGuidance'), 
          t('home.team.roles.teamManagement'),
          t('home.team.roles.technicalSupport')
        ], 
        avatar: locale.value === 'zh' ? '孙' : 'Sun', 
        description: t('home.team.memberDescriptions.sun') 
      },
      { id: 'member2', name: t('home.team.memberNames.huang'), type: 'member', group: 2, 
        roles: [
          t('home.team.roles.teamManagement'), 
          t('home.team.roles.algorithmOptimization'), 
          t('home.team.roles.dataCollection'), 
          t('home.team.roles.technicalSupport')
        ], 
        avatar: locale.value === 'zh' ? '黄' : 'H', 
        description: t('home.team.memberDescriptions.huang') 
      },
      { id: 'member3', name: t('home.team.memberNames.wang'), type: 'member', group: 2, 
        roles: [
          t('home.team.roles.algorithmOptimization'), 
          t('home.team.roles.dataCollection'),
          t('home.team.roles.designRenovation')
        ], 
        avatar: locale.value === 'zh' ? '王' : 'W', 
        description: t('home.team.memberDescriptions.wang')
      },
      { id: 'member4', name: t('home.team.memberNames.zhu'), type: 'member', group: 3, 
        roles: [t('home.team.roles.algorithmOptimization')], 
        avatar: locale.value === 'zh' ? '朱' : 'Z', 
        description: t('home.team.memberDescriptions.zhu') 
      },
      { id: 'member5', name: t('home.team.memberNames.xu'), type: 'member', group: 3, 
        roles: [t('home.team.roles.algorithmOptimization')], 
        avatar: locale.value === 'zh' ? '徐' : 'X', 
        description: t('home.team.memberDescriptions.xu') 
      },
      { id: 'member6', name: t('home.team.memberNames.hou'), type: 'member', group: 3, 
        roles: [t('home.team.roles.algorithmOptimization')], 
        avatar: locale.value === 'zh' ? '侯' : 'H', 
        description: t('home.team.memberDescriptions.hou') 
      },
      { id: 'member7', name: t('home.team.memberNames.peng'), type: 'member', group: 6, 
        roles: [t('home.team.roles.designRenovation')], 
        avatar: locale.value === 'zh' ? '彭' : 'P', 
        description: t('home.team.memberDescriptions.peng') 
      },
      { id: 'member8', name: t('home.team.governmentName'), type: 'member', group: 7, 
        roles: [t('home.team.roles.governmentSupport')], 
        avatar: locale.value === 'zh' ? '政' : 'G', 
        description: t('home.team.memberDescriptions.government') 
      }
    ],
    links: [
      // 成员到角色的连接
      { source: 'member1', target: 'role1', value: 1 },
      { source: 'member1', target: 'role2', value: 1 },
      { source: 'member1', target: 'role5', value: 1 },
      { source: 'member2', target: 'role2', value: 1 },
      { source: 'member2', target: 'role3', value: 1 },
      { source: 'member2', target: 'role4', value: 1 },
      { source: 'member2', target: 'role5', value: 1 },
      { source: 'member3', target: 'role3', value: 1 },
      { source: 'member3', target: 'role4', value: 1 },
      { source: 'member3', target: 'role6', value: 1 },
      { source: 'member4', target: 'role3', value: 1 },
      { source: 'member5', target: 'role3', value: 1 },
      { source: 'member6', target: 'role3', value: 1 },
      { source: 'member7', target: 'role6', value: 1 },
      { source: 'member8', target: 'role7', value: 1 }
    ]
  };
});

// 计算每个角色的成员数量
const getRoleMemberCount = (roleName) => {
  // 查找对应角色节点的ID
  const roleNode = teamData.value.nodes.find(n => n.type === 'role' && n.name === roleName);
  if (!roleNode) return 0;
  
  // 计算连接到这个角色的成员数量
  return teamData.value.links.filter(link => link.target === roleNode.id).length;
};

onMounted(() => {
  // 为卡片添加鼠标悬停效果
  const cards = document.querySelectorAll('.info-card, .scenario-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('card-hover');
    });
    
    card.addEventListener('mouseleave', () => {
      card.classList.remove('card-hover');
    });
  });
  
  // 为了解更多按钮添加点击效果
  const buttons = document.querySelectorAll('.learn-more');
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.target.classList.add('button-clicked');
      setTimeout(() => {
        e.target.classList.remove('button-clicked');
      }, 300);
    });
  });
  
  // 初始化网络图
  initNetworkChart();
});

// 初始化网络图
const initNetworkChart = () => {
  const container = networkChart.value;
  const width = container.clientWidth;
  const height = 500;
  
  // 删除可能存在的旧SVG
  d3.select(container).selectAll("svg").remove();
  
  // 创建SVG
  const svg = d3.select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  
  svgRef.value = svg;
  
  // 为SVG创建主要的group元素，它会被缩放和平移
  const g = svg.append("g");
  zoomGroup.value = g;
  
  // 定义缩放行为
  const zoom = d3.zoom()
    .scaleExtent([0.3, 3]) // 缩放范围限制
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
      
      // 在缩放时更新tooltip位置
      if (showTooltip.value) {
        const containerRect = networkChart.value.getBoundingClientRect();
        tooltipStyle.value = {
          left: (event.sourceEvent?.clientX - containerRect.left + 10) + 'px',
          top: (event.sourceEvent?.clientY - containerRect.top - 10) + 'px'
        };
      }
    });
  
  // 应用缩放行为到SVG
  svg.call(zoom);
  currentZoom.value = zoom;
  
  // 使用计算属性获取当前语言的团队数据
  const currentTeamData = teamData.value;
  
  // 定义力导向图布局
  const simulation = d3.forceSimulation(currentTeamData.nodes)
    .force("link", d3.forceLink(currentTeamData.links).id(d => d.id).distance(120))
    .force("charge", d3.forceManyBody().strength(-500))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(d => d.type === 'role' ? 60 : 30).iterations(2))
    .alpha(0.3)
    .alphaDecay(0.02);
  
  // 为角色节点添加固定位置 - 保持稳定布局
  currentTeamData.nodes.forEach(node => {
    if (node.type === 'role') {
      switch(node.id) {
        case 'role1': // 理论指导
          node.fx = width * 0.2;
          node.fy = height * 0.2;
          break;
        case 'role2': // 团队管理
          node.fx = width * 0.4;
          node.fy = height * 0.3;
          break;
        case 'role3': // 算法优化
          node.fx = width * 0.6;
          node.fy = height * 0.4;
          break;
        case 'role4': // 数据采集
          node.fx = width * 0.7;
          node.fy = height * 0.6;
          break;
        case 'role5': // 技术支持
          node.fx = width * 0.3;
          node.fy = height * 0.7;
          break;
        case 'role6': // 改造设计
          node.fx = width * 0.8;
          node.fy = height * 0.3;
          break;
        case 'role7': // 政府支持
          node.fx = width * 0.5;
          node.fy = height * 0.8;
          break;
      }
    }
  });
  
  // 定义颜色比例尺
  const color = d3.scaleOrdinal()
    .domain([1, 2, 3, 4, 5, 6, 7])
    .range(["#4682B4", "#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272"]);
  
  // 创建分组 - 先创建连线层，再创建节点层
  const linkGroup = g.append("g").attr("class", "links");
  const nodeGroup = g.append("g").attr("class", "nodes");
  
  // 绘制连接线 - 在底层
  const link = linkGroup.selectAll("line")
    .data(currentTeamData.links)
    .enter()
    .append("line")
    .attr("stroke", d => color(d.source.group || 1))
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", 2);
  
  // 创建节点组 - 在上层
  const node = nodeGroup.selectAll(".node")
    .data(currentTeamData.nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
  
  // 为角色节点先添加白色背景圆作为遮挡
  node.filter(d => d.type === 'role')
    .append("circle")
    .attr("r", 45)
    .attr("fill", "white")
    .attr("stroke", "none");
    
  // 为角色节点绘制圆环边框
  node.filter(d => d.type === 'role')
    .append("circle")
    .attr("r", 45)
    .attr("fill", "none")
    .attr("stroke", d => color(d.group))
    .attr("stroke-width", 3);
  
  // 为角色节点添加文本
  node.filter(d => d.type === 'role')
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .attr("fill", "#333")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .each(function(d) {
      // 将长文本分成多行
      const text = d3.select(this);
      const words = d.name.split(/\s+/);
      const lineHeight = 1.1; // 行高
      const radius = 40; // 圆的半径
      const maxWidth = radius * 1.5; // 文本最大宽度
      
      // 清空当前文本
      text.text(null);
      
      // 如果是单个短词，直接显示
      if (words.length === 1 && words[0].length <= 10) {
        text.text(words[0]);
        return;
      }
      
      // 为长文本创建多行
      let line = [];
      let lineNumber = 0;
      let tspan = text.append("tspan")
        .attr("x", 0)
        .attr("dy", 0);
      
      words.forEach(word => {
        line.push(word);
        tspan.text(line.join(" "));
        
        // 如果当前行太长，回退一个词并创建新行
        if (tspan.node().getComputedTextLength() > maxWidth && line.length > 1) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          lineNumber++;
          
          // 计算新行的垂直位置，确保文本整体垂直居中
          const yPos = (lineNumber - (words.length > 3 ? 1 : 0.5)) * lineHeight;
          
          tspan = text.append("tspan")
            .attr("x", 0)
            .attr("dy", `${lineHeight}em`)
            .text(word);
        }
      });
      
      // 调整整体文本垂直位置，使其在圆内居中
      const totalLines = text.selectAll("tspan").size() || 1;
      text.selectAll("tspan").each(function(_, i) {
        const tspan = d3.select(this);
        const dy = parseFloat(tspan.attr("dy")) || 0;
        tspan.attr("dy", i === 0 ? `${-(totalLines-1)/2 * lineHeight}em` : `${lineHeight}em`);
      });
    });
  
  // 为成员节点添加白色背景 - 确保完全覆盖连线
  node.filter(d => d.type === 'member')
    .append("circle")
    .attr("r", 20)
    .attr("fill", "white")
    .attr("stroke", "none");
    
  // 为成员节点绘制彩色圆点
  node.filter(d => d.type === 'member')
    .append("circle")
    .attr("r", 20)
    .attr("fill", d => color(d.group))
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5);
  
  // 为成员节点添加首字母标识
  node.filter(d => d.type === 'member')
    .append("text")
    .text(d => d.avatar)
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .attr("fill", "#fff")
    .style("font-size", "12px")
    .style("font-weight", "bold");
  
  // 修改节点的mouseover事件
  node.on("mouseover", (event, d) => {
    // 显示提示框
    showTooltip.value = true;
    tooltipData.name = d.name;
    tooltipData.role = d.type === 'role' ? t('home.team.typeRole') : d.roles.join('、');
    
    // 更新提示框位置，改为相对于网络图容器的位置
    const containerRect = networkChart.value.getBoundingClientRect();
    tooltipStyle.value = {
      left: (event.sourceEvent?.clientX || event.clientX - containerRect.left + 10) + 'px',
      top: (event.sourceEvent?.clientY || event.clientY - containerRect.top - 10) + 'px'
    };
    
    // 高亮节点及其连接
    highlightNode(d);
  })
  .on("mouseout", () => {
    // 隐藏提示框
    showTooltip.value = false;
    
    // 恢复所有节点和连接的样式
    resetHighlight();
  })
  .on("click", (event, d) => {
    // 点击成员节点显示详细信息
    if (d.type === 'member') {
      event.stopPropagation();
      selectedMember.value = d;
      // 点击节点后隐藏浮动提示框
      showTooltip.value = false;
    }
  });
  
  // 点击其他区域取消选中
  svg.on("click", () => {
    selectedMember.value = null;
  });
  
  // 更新布局
  simulation.on("tick", () => {
    link.attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    
    node.attr("transform", d => `translate(${d.x},${d.y})`);
  });
  
  // 拖拽事件处理函数需与缩放协同工作
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  
  // 高亮显示节点及其连接
  function highlightNode(d) {
    // 降低所有节点和连接的不透明度
    node.style("opacity", 0.3);
    link.style("opacity", 0.1);
    
    // 高亮被选中的节点
    node.filter(n => n.id === d.id)
      .style("opacity", 1);
    
    // 高亮与所选节点直接相连的节点和连接
    if (d.type === 'role') {
      // 如果选中的是角色，高亮所有连接到该角色的成员
      link.filter(l => l.target.id === d.id)
        .style("opacity", 0.8)
        .attr("stroke-width", 3);
      
      node.filter(n => currentTeamData.links.some(l => l.source.id === n.id && l.target.id === d.id))
        .style("opacity", 1);
    } else {
      // 如果选中的是成员，高亮所有该成员连接的角色
      link.filter(l => l.source.id === d.id)
        .style("opacity", 0.8)
        .attr("stroke-width", 3);
      
      node.filter(n => currentTeamData.links.some(l => l.source.id === d.id && l.target.id === n.id))
        .style("opacity", 1);
    }
  }
  
  // 重置高亮
  function resetHighlight() {
    node.style("opacity", 1);
    link.style("opacity", 0.6).attr("stroke-width", 2);
  }
};

// 获取节点颜色的函数
const getMemberColor = (member) => {
  const colorMap = {
    1: "#4682B4",
    2: "#5470c6", 
    3: "#91cc75", 
    4: "#fac858", 
    5: "#ee6666", 
    6: "#73c0de", 
    7: "#3ba272"
  };
  return colorMap[member.group] || "#4682B4";
};

// 添加角色标签背景色函数
const getRoleBackgroundColor = (roleName) => {
  const roleColorMap = {
    '理论指导': 'rgba(70, 130, 180, 0.1)',  // #4682B4
    '团队管理': 'rgba(84, 112, 198, 0.1)',  // #5470c6
    '算法优化': 'rgba(145, 204, 117, 0.1)', // #91cc75
    '数据采集': 'rgba(250, 200, 88, 0.1)',  // #fac858
    '技术支持': 'rgba(238, 102, 102, 0.1)', // #ee6666
    '改造设计': 'rgba(115, 192, 222, 0.1)', // #73c0de
    '政府支持': 'rgba(59, 162, 114, 0.1)'   // #3ba272
  };
  return roleColorMap[roleName] || 'rgba(47, 255, 10, 0.1)';
};

// 添加角色标签文字色函数
const getRoleTextColor = (roleName) => {
  const roleTextColorMap = {
    '理论指导': '#4682B4',
    '团队管理': '#5470c6',
    '算法优化': '#5b8c3e',
    '数据采集': '#d99a22',
    '技术支持': '#cc4545',
    '改造设计': '#3d8aab',
    '政府支持': '#3ba272'
  };
  return roleTextColorMap[roleName] || '#42b983';
};

// 监听语言变化，重新初始化网络图
watch(() => locale.value, () => {
  // 当有选中的成员时，更新成员信息
  if (selectedMember.value) {
    // 保存当前选中成员的ID
    const selectedId = selectedMember.value.id;
    
    // 从更新后的teamData中找到对应ID的成员，并更新selectedMember
    const updatedMember = teamData.value.nodes.find(node => node.id === selectedId);
    if (updatedMember) {
      selectedMember.value = updatedMember;
    }
  }
  
  // 给一些时间让i18n完成切换
  setTimeout(() => {
    initNetworkChart();
  }, 100);
});
</script>

<style scoped>
/* MacOS风格CSS */
@font-face {
  font-family: 'SF Pro Text';
  src: local('SF Pro Text'), local('SFProText-Regular');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'SF Pro Display';
  src: local('SF Pro Display'), local('SFProDisplay-Bold');
  font-weight: bold;
  font-style: normal;
}

.home {
  background-color: #F2F2F7;
  width: 100%;
  min-height: calc(100vh - 130px); /* 减去navbar和footer高度 */
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  color: #1D1D1F;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
}

.main-content {
  width: 100%;
  max-width: 1200px; /* 限制最大宽度以提高可读性 */
  margin: 0 auto; /* 水平居中 */
  padding: 30px 20px;
  box-sizing: border-box;
}

/* 卡片通用样式 */
.card {
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  transform: scale(1.03);
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.12);
}

.card-content {
  padding: 20px;
}

.card-title {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 17px;
  margin: 0 0 10px 0;
  color: #1D1D1F;
}

/* 封面区样式 */
.hero-section {
  margin-bottom: 30px;
}

.hero-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(10, 132, 255, 0.05));
}

.hero-content {
  text-align: center;
  padding: 20px;
  max-width: 600px;
}

.headline {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 28px;
  margin: 0 0 15px 0;
  color: #1D1D1F;
}

.subheadline {
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  color: #86868B;
  margin-bottom: 30px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.button {
  padding: 8px 20px;
  border-radius: 18px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 200ms ease, transform 200ms ease;
  display: inline-block;
}

.button:hover {
  transform: scale(1.03);
}

.button.primary {
  background-color: #42b983;
  color: white;
}

.button.primary:hover {
  background-color: #3aa876;
}

.button.secondary {
  background-color: rgba(0, 0, 0, 0.05);
  color: #1D1D1F;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.button.secondary:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

/* 部分通用样式 */
.section {
  margin-bottom: 30px;
}

.section-title {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 20px;
  margin: 0 0 20px 0;
  color: #1D1D1F;
}

/* 卡片网格样式 */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* 团队网络图样式 */
.team-container {
  display: flex;
  gap: 20px;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  position: relative;
}

.network-wrapper {
  position: relative;
  flex: 3;
  height: 550px;
  padding: 20px;
  background-color: #FFFFFF;
}

.network-chart {
  width: 100%;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  cursor: grab;
}

.network-chart:active {
  cursor: grabbing;
}

.team-info {
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #FFFFFF;
}

.team-info-card {
  padding: 25px;
  background-color: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.team-info-title {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 24px;
  margin: 0 0 20px 0;
  color: #1D1D1F;
  position: relative;
  padding-bottom: 10px;
  text-align: center;
}

.team-info-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #42b983;
  border-radius: 3px;
}

.team-info-content {
  color: #4a4a4a;
  line-height: 1.7;
  font-size: 15px;
}

.team-info-tips {
  margin-top: 20px;
  display: flex;
  align-items: center;
  background-color: rgba(245, 245, 247, 0.7);
  padding: 12px 15px;
  border-radius: 10px;
  border-left: 4px solid #42b983;
}

.tip-icon {
  color: #42b983;
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.tip-text {
  font-size: 14px;
  color: #636366;
}

.member-card {
  padding: 25px;
  background-color: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  margin: 0;
  max-width: 100%;
}

.member-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.member-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 26px;
  color: white;
  margin-right: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.member-basic h3 {
  margin: 0;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 24px;
  color: #1D1D1F;
  letter-spacing: -0.5px;
}

.member-roles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.role-tag {
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.member-body {
  color: #4a4a4a;
  line-height: 1.7;
  font-size: 15px;
  background-color: rgba(245, 245, 247, 0.5);
  padding: 15px;
  border-radius: 10px;
  border-left: 4px solid #42b983;
  margin-top: 5px;
}

.member-body p {
  margin: 0;
}

/* 固定位置的工具提示样式 */
.fixed-tooltip {
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  pointer-events: none;
  transition: all 0.2s ease;
  max-width: 200px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

/* 添加新的团队成员列表样式 */
.team-members-list {
  margin: 20px 0;
  background-color: rgba(245, 245, 247, 0.5);
  border-radius: 12px;
  padding: 5px;
}

.team-member-item {
  display: flex;
  padding: 12px 15px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.06);
  align-items: center;
}

.team-member-item:last-child {
  border-bottom: none;
}

.member-label {
  flex: 0 0 90px;
  font-weight: 600;
  color: #42b983;
  position: relative;
}

.member-value {
  flex: 1;
  color: #333;
}

.team-info-paragraph {
  margin-bottom: 16px;
  text-indent: 2em;
  line-height: 1.8;
  letter-spacing: 0.02em;
  font-size: 15px;
  text-align: justify;
  color: #333;
}

.keyword {
  font-weight: 600;
  color: #42b983;
}

/* 控制按钮容器样式 - 中下位置布局 */
.controls-container {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}

.controls-wrapper {
  display: flex;
  gap: 12px;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 10px;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.zoom-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #42b983;
}

.zoom-button:hover {
  background-color: #42b983;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.zoom-button:active {
  transform: scale(0.95);
}

/* 响应式调整 */
@media (max-width: 900px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .team-container {
    flex-direction: column;
  }
  
  .network-wrapper {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .controls-wrapper {
    padding: 8px;
    border-radius: 25px;
  }
  
  .zoom-button {
    width: 42px;
    height: 42px;
  }
}

/* 项目简介部分优化样式 */
.project-intro-section {
  margin-bottom: 50px;
}

.project-intro-section .section-title {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
  padding-bottom: 15px;
}

.project-intro-section .section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #42b983;
  border-radius: 3px;
}

.intro-card {
  background-color: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 300ms ease, box-shadow 300ms ease;
  border: none;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.intro-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(66, 185, 131, 0.15);
}

.intro-card-header {
  padding: 25px 25px 15px;
  display: flex;
  align-items: center;
}

.intro-card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: rgba(66, 185, 131, 0.1);
  color: #42b983;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.intro-card-title {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  color: #1D1D1F;
}

.intro-card-content {
  padding: 0 25px 25px;
  flex-grow: 1;
}

.intro-card-content p {
  margin: 10px 0;
  color: #4a4a4a;
  line-height: 1.8;
  font-size: 15px;
  text-align: justify;
}

/* 为每个卡片自定义颜色 */
.intro-card:nth-child(1) .intro-card-icon {
  background-color: rgba(70, 130, 180, 0.1);
  color: #4682B4;
}

.intro-card:nth-child(2) .intro-card-icon {
  background-color: rgba(84, 112, 198, 0.1);
  color: #5470c6;
}

.intro-card:nth-child(3) .intro-card-icon {
  background-color: rgba(59, 162, 114, 0.1);
  color: #3ba272;
}

/* 项目团队部分标题样式 */
.section:has(.team-container) .section-title {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
  padding-bottom: 15px;
}

.section:has(.team-container) .section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #42b983;
  border-radius: 3px;
}
</style> 