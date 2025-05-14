<template>
  <div class="algorithm-explanation">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h3>{{ t('app.title') }}</h3>
      </div>
      <div class="sidebar-menu">
        <router-link to="/" class="menu-item" exact-active-class="active">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>{{ t('app.nav.home') }}</span>
        </router-link>

        <router-link to="/algorithm" class="menu-item" active-class="active">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span>{{ t('app.nav.algorithm') }}</span>
        </router-link>
        
        <router-link to="/model" class="menu-item" active-class="active">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
            <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
            <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span>{{ t('app.nav.model') }}</span>
        </router-link>

        <router-link to="/data" class="menu-item" active-class="active">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          <span>{{ t('app.nav.data') }}</span>
        </router-link>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- <h1 class="page-title">算法与应用场景说明</h1> -->
      <!-- 研究框架 (Research Framework) -->
      <section class="mac-section">
        <h2 class="section-title">{{ t('algorithm.researchFramework.title') }}</h2>
        <div class="mac-card">
          <div class="content-wrapper">
            <div class="text-content">
              <!-- 折叠面板组件 -->
              <div class="accordion">
                <div class="accordion-item">
                  <div class="accordion-header" @click="toggleAccordion('multiSource')">
                    <h4>{{ t('algorithm.researchFramework.multiSource.title') }}</h4>
                    <span class="accordion-icon">{{ accordionState.multiSource ? '−' : '+' }}</span>
            </div>
                  <div class="accordion-content" :class="{ 'active': accordionState.multiSource }">
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>
                        <span v-html="renderRichText('algorithm.researchFramework.multiSource.description')"></span>
                      </p>
            </div>
                  </div>
                </div>
                
                <div class="accordion-item">
                  <div class="accordion-header" @click="toggleAccordion('videoData')">
                    <h4>{{ t('algorithm.researchFramework.videoData.title') }}</h4>
                    <span class="accordion-icon">{{ accordionState.videoData ? '−' : '+' }}</span>
                  </div>
                  <div class="accordion-content" :class="{ 'active': accordionState.videoData }">
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>
                        <span v-html="renderRichText('algorithm.researchFramework.videoData.description1')"></span>
                      </p>
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>
                        <span v-html="renderRichText('algorithm.researchFramework.videoData.description2')"></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="framework-diagram">
            <zoomable-mermaid 
              class="mermaid-container" 
              :diagram="flowchartVideoDefinition" 
              :key="'video-diagram-' + locale"
              theme="neutral"
              :title="t('algorithm.flowcharts.videoData.title')"
              :description="t('algorithm.researchFramework.flowcharts.videoDesc')"
            />
            <zoomable-mermaid 
              class="mermaid-container" 
              :diagram="flowchartMultiSourceDefinition" 
              :key="'multi-source-diagram-' + locale"
              theme="neutral"
              :title="t('algorithm.flowcharts.multiSource.title')"
              :description="t('algorithm.researchFramework.flowcharts.multiSourceDesc')"
            />
          </div>
        </div>
      </section>
      
      <!-- 数据采样方法 -->
      <section class="mac-section">
        <h2 class="section-title">{{ t('algorithm.samplingMethods.title') }}</h2>
        <p class="section-intro">{{ t('algorithm.samplingMethods.intro') }}</p>
        <div class="mac-card">
          <img :src="getImagePath(t('algorithm.samplingMethods.imagePath'))" alt="数据采样方法" class="perception-image" />
        </div>
        
        <div class="mac-card">
          <div class="tech-details-tabs">
            <div class="tab-buttons">
              <button class="tab-button" :class="{ active: samplingMethodTab === 'c1f1' }" @click="samplingMethodTab = 'c1f1'">
                {{ t('algorithm.samplingMethods.c1f1.title') }} <div class="method-tag-inline">{{ t('algorithm.samplingMethods.c1f1.tag') }}</div>
              </button>
              <button class="tab-button" :class="{ active: samplingMethodTab === 'c1fn' }" @click="samplingMethodTab = 'c1fn'">
                {{ t('algorithm.samplingMethods.c1fn.title') }} <div class="method-tag-inline">{{ t('algorithm.samplingMethods.c1fn.tag') }}</div>
              </button>
              <button class="tab-button" :class="{ active: samplingMethodTab === 'cmf1' }" @click="samplingMethodTab = 'cmf1'">
                {{ t('algorithm.samplingMethods.cmf1.title') }} <div class="method-tag-inline">{{ t('algorithm.samplingMethods.cmf1.tag') }}</div>
              </button>
              <button class="tab-button" :class="{ active: samplingMethodTab === 'cmfn' }" @click="samplingMethodTab = 'cmfn'">
                {{ t('algorithm.samplingMethods.cmfn.title') }} <div class="method-tag-inline">{{ t('algorithm.samplingMethods.cmfn.tag') }}</div>
              </button>
            </div>
            
            <div class="tab-content">
              <!-- 单视角单时刻 Tab -->
              <div v-if="samplingMethodTab === 'c1f1'" class="tab-pane">
                <div class="content-wrapper">
                  <div class="text-content">
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>
                        <span v-html="renderRichText('algorithm.samplingMethods.c1f1.description')"></span>
                      </p>
                    </div>
                    
                    <div class="accordion">
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('c1f1Implementation')">
                <h4>{{ t('algorithm.samplingMethods.c1f1.implementation') }}</h4>
                          <span class="accordion-icon">{{ accordionState.c1f1Implementation ? '−' : '+' }}</span>
                        </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.c1f1Implementation }">
                          <div class="document-text">
                            <p class="document-paragraph">
                              <span class="paragraph-indent"></span>
                              <span v-html="renderRichText('algorithm.samplingMethods.c1f1.implementationDesc')"></span>
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('c1f1Applications')">
                <h4>{{ t('algorithm.samplingMethods.c1f1.applications') }}</h4>
                          <span class="accordion-icon">{{ accordionState.c1f1Applications ? '−' : '+' }}</span>
              </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.c1f1Applications }">
                          <div class="document-text">
                            <div class="document-list">
                              <li>{{ t('algorithm.samplingMethods.c1f1.app1') }}</li>
                              <li>{{ t('algorithm.samplingMethods.c1f1.app2') }}</li>
                              <li>{{ t('algorithm.samplingMethods.c1f1.app3') }}</li>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
              </div>
            </div>
          </div>
          
              <!-- 单视角多时刻 Tab -->
              <div v-if="samplingMethodTab === 'c1fn'" class="tab-pane">
                <div class="content-wrapper">
                  <div class="text-content">
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.samplingMethods.c1fn.description') }}
                      </p>
            </div>
                    <div class="accordion">
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('c1fnImplementation')">
                <h4>{{ t('algorithm.samplingMethods.c1fn.implementation') }}</h4>
                          <span class="accordion-icon">{{ accordionState.c1fnImplementation ? '−' : '+' }}</span>
                        </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.c1fnImplementation }">
              <div class="document-text">
                <p class="document-paragraph">
                              <span class="paragraph-indent"></span>{{ t('algorithm.samplingMethods.c1fn.implementationDesc') }}
                </p>
              </div>
            </div>
              </div>
                      
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('c1fnApplications')">
                <h4>{{ t('algorithm.samplingMethods.c1fn.applications') }}</h4>
                          <span class="accordion-icon">{{ accordionState.c1fnApplications ? '−' : '+' }}</span>
              </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.c1fnApplications }">
                          <div class="document-text">
                            <div class="document-list">
                              <li>{{ t('algorithm.samplingMethods.c1fn.app1') }}</li>
                              <li>{{ t('algorithm.samplingMethods.c1fn.app2') }}</li>
                              <li>{{ t('algorithm.samplingMethods.c1fn.app3') }}</li>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
              </div>
            </div>
          </div>
          
              <!-- 多视角单时刻 Tab -->
              <div v-if="samplingMethodTab === 'cmf1'" class="tab-pane">
                <div class="content-wrapper">
                  <div class="text-content">
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.samplingMethods.cmf1.description') }}
                      </p>
            </div>
                    
                    <div class="accordion">
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('cmf1Implementation')">
                <h4>{{ t('algorithm.samplingMethods.cmf1.implementation') }}</h4>
                          <span class="accordion-icon">{{ accordionState.cmf1Implementation ? '−' : '+' }}</span>
                        </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.cmf1Implementation }">
                          <div class="document-text">
                            <p class="document-paragraph">
                              <span class="paragraph-indent"></span>{{ t('algorithm.samplingMethods.cmf1.implementationDesc') }}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('cmf1Applications')">
                <h4>{{ t('algorithm.samplingMethods.cmf1.applications') }}</h4>
                          <span class="accordion-icon">{{ accordionState.cmf1Applications ? '−' : '+' }}</span>
              </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.cmf1Applications }">
                          <div class="document-text">
                            <div class="document-list">
                              <li>{{ t('algorithm.samplingMethods.cmf1.app1') }}</li>
                              <li>{{ t('algorithm.samplingMethods.cmf1.app2') }}</li>
                              <li>{{ t('algorithm.samplingMethods.cmf1.app3') }}</li>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
              </div>
            </div>
          </div>
          
              <!-- 多视角多时刻 Tab -->
              <div v-if="samplingMethodTab === 'cmfn'" class="tab-pane">
                <div class="content-wrapper">
                  <div class="text-content">
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.samplingMethods.cmfn.description') }}
                      </p>
            </div>
                    
                    <div class="accordion">
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('cmfnImplementation')">
                <h4>{{ t('algorithm.samplingMethods.cmfn.implementation') }}</h4>
                          <span class="accordion-icon">{{ accordionState.cmfnImplementation ? '−' : '+' }}</span>
                        </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.cmfnImplementation }">
                          <div class="document-text">
                            <p class="document-paragraph">
                              <span class="paragraph-indent"></span>{{ t('algorithm.samplingMethods.cmfn.implementationDesc') }}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('cmfnApplications')">
                <h4>{{ t('algorithm.samplingMethods.cmfn.applications') }}</h4>
                          <span class="accordion-icon">{{ accordionState.cmfnApplications ? '−' : '+' }}</span>
              </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.cmfnApplications }">
                          <div class="document-text">
                            <div class="document-list">
                              <li>{{ t('algorithm.samplingMethods.cmfn.app1') }}</li>
                              <li>{{ t('algorithm.samplingMethods.cmfn.app2') }}</li>
                              <li>{{ t('algorithm.samplingMethods.cmfn.app3') }}</li>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 基于视频数据的社区更新人车流感知系统 -->
      <section class="mac-section">
        <h2 class="section-title">{{ t('algorithm.perceptionSystem.title') }}</h2>
        <div class="mac-card">
          <div class="perception-system-container">
            <div class="perception-text">
              <h3 class="perception-subtitle">{{ t('algorithm.perceptionSystem.overviewTitle') }}</h3>
              <div class="document-text">
                <p class="document-paragraph">
                  <span class="paragraph-indent"></span>
                  <span v-html="renderRichText('algorithm.perceptionSystem.overview1')"></span>
                </p>
                <p class="document-paragraph">
                  <span class="paragraph-indent"></span>
                  <span v-html="renderRichText('algorithm.perceptionSystem.overview2')"></span>
                </p>
              </div>
            </div>
            
            <div class="perception-visuals">
              <div class="perception-image-container">
                <img :src="getImagePath(t('algorithm.perceptionSystem.summaryImagePath'))" :alt="t('algorithm.perceptionSystem.summaryImageAlt')" class="perception-image" />
                <div class="image-caption">{{ t('algorithm.perceptionSystem.summaryImageCaption') }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 系统架构 (System Architecture) -->
      <section class="mac-section">
        <h2 class="section-title">{{ t('algorithm.systemArchitecture.title') }}</h2>
        <div class="mac-card">
          <div class="architecture-container">
            <div class="scrollable-container">
              <img :src="getImagePath(t('algorithm.systemArchitecture.architectureImagePath'))" :alt="t('algorithm.systemArchitecture.architectureImageAlt')" class="perception-image" />
              </div>
            <div class="architecture-steps">
              <!-- 感知层 -->
              <div class="arch-step">
                <div class="arch-step-number">1</div>
                <div class="arch-step-content">
                  <h4>{{ t('algorithm.systemArchitecture.perception.title') }}</h4>
                  <p>{{ t('algorithm.systemArchitecture.perception.description') }}</p>
                  <button @click="toggleLayerDetail('perception')" class="layer-detail-button">
                    {{ layerDetailState.perception ? t('algorithm.systemArchitecture.perception.buttonHide') : t('algorithm.systemArchitecture.perception.buttonShow') }}
                  </button>
            </div>
              </div>
              <div class="arch-step-arrow">→</div>

              <!-- 分析层 -->
              <div class="arch-step">
                <div class="arch-step-number">2</div>
                <div class="arch-step-content">
                  <h4>{{ t('algorithm.systemArchitecture.analysis.title') }}</h4>
                  <p>{{ t('algorithm.systemArchitecture.analysis.description') }}</p>
                  <button @click="toggleLayerDetail('analysis')" class="layer-detail-button">
                    {{ layerDetailState.analysis ? t('algorithm.systemArchitecture.analysis.buttonHide') : t('algorithm.systemArchitecture.analysis.buttonShow') }}
                  </button>
                </div>
              </div>
              <div class="arch-step-arrow">→</div>
              
              <!-- 执行层 -->
              <div class="arch-step">
                <div class="arch-step-number">3</div>
                <div class="arch-step-content">
                  <h4>{{ t('algorithm.systemArchitecture.execution.title') }}</h4>
                  <p>{{ t('algorithm.systemArchitecture.execution.description') }}</p>
                  <button @click="toggleLayerDetail('execution')" class="layer-detail-button">
                    {{ layerDetailState.execution ? t('algorithm.systemArchitecture.execution.buttonHide') : t('algorithm.systemArchitecture.execution.buttonShow') }}
                  </button>
                </div>
              </div>
              
              <!-- 添加每个层的详情卡片容器 -->
              <!-- 感知层详情容器 -->
              <div v-if="layerDetailState.perception" class="layer-detail-container">
                <div class="layer-detail-card">
                  <div class="layer-detail-header">
                    <h4>{{ t('algorithm.systemArchitecture.perception.detailTitle') }}</h4>
                    <button @click="toggleLayerDetail('perception')" class="layer-detail-close">×</button>
                  </div>
                  <div class="layer-detail-content">
                    <img :src="getImagePath(t('algorithm.systemArchitecture.perception.imagePath'))" :alt="t('algorithm.systemArchitecture.perception.imageAlt')" class="layer-detail-image" />
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>
                        <span v-html="renderRichText('algorithm.systemArchitecture.perception.detail1')"></span>
                      </p>
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>
                        <span v-html="renderRichText('algorithm.systemArchitecture.perception.conclusion')"></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 分析层详情容器 -->
              <div v-if="layerDetailState.analysis" class="layer-detail-container">
                <div class="layer-detail-card">
                  <div class="layer-detail-header">
                    <h4>{{ t('algorithm.systemArchitecture.analysis.detailTitle') }}</h4>
                    <button @click="toggleLayerDetail('analysis')" class="layer-detail-close">×</button>
                  </div>
                  <div class="layer-detail-content">
                    <img :src="getImagePath(t('algorithm.systemArchitecture.analysis.imagePath'))" :alt="t('algorithm.systemArchitecture.analysis.imageAlt')" class="layer-detail-image" />
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.systemArchitecture.analysis.detail1') }}
                      </p>
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.systemArchitecture.analysis.detail2') }}
                      </p>
                      <div class="document-list">
                        <li><span class="text-highlight">{{ t('algorithm.systemArchitecture.analysis.components.objectDetection') }}</span></li>
                        <li><span class="text-highlight">{{ t('algorithm.systemArchitecture.analysis.components.behaviorAnalysis') }}</span></li>
                        <li><span class="text-highlight">{{ t('algorithm.systemArchitecture.analysis.components.spaceAnalysis') }}</span></li>
                        <li><span class="text-highlight">{{ t('algorithm.systemArchitecture.analysis.components.parkingSystem') }}</span></li>
                        <li><span class="text-highlight">{{ t('algorithm.systemArchitecture.analysis.components.visualization') }}</span></li>
                      </div>
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.systemArchitecture.analysis.conclusion') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 执行层详情容器 -->
              <div v-if="layerDetailState.execution" class="layer-detail-container">
                <div class="layer-detail-card">
                  <div class="layer-detail-header">
                    <h4>{{ t('algorithm.systemArchitecture.execution.detailTitle') }}</h4>
                    <button @click="toggleLayerDetail('execution')" class="layer-detail-close">×</button>
                  </div>
                  <div class="layer-detail-content">
                    <img :src="getImagePath(t('algorithm.systemArchitecture.execution.imagePath'))" :alt="t('algorithm.systemArchitecture.execution.imageAlt')" class="layer-detail-image" />
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.systemArchitecture.execution.detail1') }}
                      </p>
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.systemArchitecture.execution.detail2') }}
                      </p>
                      <div class="document-list">
                        <li><span class="text-highlight">{{ t('algorithm.systemArchitecture.execution.components.dailyManagement.title') }}</span></li>
                        <ul class="nested-document-list">
                          <li>{{ t('algorithm.systemArchitecture.execution.components.dailyManagement.parking') }}</li>
                          <li>{{ t('algorithm.systemArchitecture.execution.components.dailyManagement.flow') }}</li>
                          <li>{{ t('algorithm.systemArchitecture.execution.components.dailyManagement.green') }}</li>
                        </ul>
                        
                        <li><span class="text-highlight">{{ t('algorithm.systemArchitecture.execution.components.renovation.title') }}</span></li>
                        <ul class="nested-document-list">
                          <li>{{ t('algorithm.systemArchitecture.execution.components.renovation.space') }}</li>
                          <li>{{ t('algorithm.systemArchitecture.execution.components.renovation.infrastructure') }}</li>
                          <li>{{ t('algorithm.systemArchitecture.execution.components.renovation.decision') }}</li>                          
                        </ul>
                      </div>
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.systemArchitecture.execution.conclusion') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 技术详情 (Technical Details) -->
      <section class="mac-section">
        <h2 class="section-title">{{ t('algorithm.techDetails.title') }}</h2>
        <div class="mac-card">
          <div class="tech-details-tabs">
            <div class="tab-buttons">
              <button class="tab-button" :class="{ active: activeTab === 'detection' }" @click="activeTab = 'detection'">{{ t('algorithm.techDetails.tabs.detection') }}</button>
              <button class="tab-button" :class="{ active: activeTab === 'parking' }" @click="activeTab = 'parking'">{{ t('algorithm.techDetails.tabs.parking') }}</button>
              <button class="tab-button" :class="{ active: activeTab === 'greenspace' }" @click="activeTab = 'greenspace'">{{ t('algorithm.techDetails.tabs.greenspace') }}</button>
              <button class="tab-button" :class="{ active: activeTab === 'digital' }" @click="activeTab = 'digital'">{{ t('algorithm.techDetails.tabs.digital') }}</button>
          </div>
              
            <div class="tab-content">
              <!-- 检测与跟踪 Tab -->
              <div v-if="activeTab === 'detection'" class="tab-pane">
                <div class="content-wrapper">
                  <div class="text-content">
                    <h4>{{ t('algorithm.techDetails.detectionTracking.title') }}</h4>
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.techDetails.detectionTracking.paragraph1') }}
                      </p>
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.techDetails.detectionTracking.paragraph2') }}
                      </p>
                      <div class="document-list">
                        <li><span class="text-highlight">{{ t('algorithm.techDetails.detectionTracking.features.realtime') }}</span></li>
                        <li><span class="text-highlight">{{ t('algorithm.techDetails.detectionTracking.features.accuracy') }}</span></li>
          </div>
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.techDetails.detectionTracking.paragraph3') }}
                      </p>
          </div>
          </div>
                  <div class="image-container">
                    <img :src="getImagePath(t('algorithm.techDetails.detectionTracking.imagePath'))" :alt="t('algorithm.techDetails.detectionTracking.imageAlt')" class="tech-yolov5-image" />
                    <p class="image-caption">{{ t('algorithm.techDetails.detectionTracking.imageCaption') }}</p>
          </div>
                </div>
              </div>
              
              <!-- 停车判定 Tab -->
              <div v-if="activeTab === 'parking'" class="tab-pane">
                <div class="content-wrapper">
                  <div class="text-content">
                    <h4>{{ t('algorithm.techDetails.parkingDetection.title') }}</h4>
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>{{ t('algorithm.techDetails.parkingDetection.paragraph1') }}
                      </p>
                    </div>
                    
                    <!-- 折叠面板组件 -->
                    <div class="accordion">
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('parkingStep1')">
                          <h4>{{ t('algorithm.techDetails.parkingDetection.steps.step1.title') }}</h4>
                          <span class="accordion-icon">{{ accordionState.parkingStep1 ? '−' : '+' }}</span>
                        </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.parkingStep1 }">
                          <div class="document-text">
                            <p class="document-paragraph">
                              <span class="paragraph-indent"></span>{{ t('algorithm.techDetails.parkingDetection.steps.step1.content') }}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('parkingStep2')">
                          <h4>{{ t('algorithm.techDetails.parkingDetection.steps.step2.title') }}</h4>
                          <span class="accordion-icon">{{ accordionState.parkingStep2 ? '−' : '+' }}</span>
                        </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.parkingStep2 }">
                          <div class="document-text">
                            <p class="document-paragraph">
                              <span class="paragraph-indent"></span>{{ t('algorithm.techDetails.parkingDetection.steps.step2.content') }}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('parkingStep3')">
                          <h4>{{ t('algorithm.techDetails.parkingDetection.steps.step3.title') }}</h4>
                          <span class="accordion-icon">{{ accordionState.parkingStep3 ? '−' : '+' }}</span>
                        </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.parkingStep3 }">
                          <div class="document-text">
                            <p class="document-paragraph">
                              <span class="paragraph-indent"></span>{{ t('algorithm.techDetails.parkingDetection.steps.step3.content') }}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('parkingStep4')">
                          <h4>{{ t('algorithm.techDetails.parkingDetection.steps.step4.title') }}</h4>
                          <span class="accordion-icon">{{ accordionState.parkingStep4 ? '−' : '+' }}</span>
                        </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.parkingStep4 }">
                          <div class="document-text">
                            <p class="document-paragraph">
                              <span class="paragraph-indent"></span>{{ t('algorithm.techDetails.parkingDetection.steps.step4.content') }}
                            </p>
                            <div class="formula-container">
                              <p class="formula">{{ t('algorithm.techDetails.parkingDetection.steps.step4.formula') }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="image-container">
                    <img :src="getImagePath(t('algorithm.techDetails.parkingDetection.imagePath'))" :alt="t('algorithm.techDetails.parkingDetection.imageAlt')" class="tech-image" />
                    <p class="image-caption">{{ t('algorithm.techDetails.parkingDetection.imageCaption') }}</p>
                  </div>
                </div>
              </div>
              
              <!-- 绿地闯入检测 Tab -->
              <div v-if="activeTab === 'greenspace'" class="tab-pane">
                <div class="content-wrapper">
                  <div class="text-content">
                    <h4>{{ t('algorithm.techDetails.greenspace.title') }}</h4>
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>
                        <span v-html="renderRichText('algorithm.techDetails.greenspace.paragraph1')"></span>
                      </p>
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>
                        <span v-html="renderRichText('algorithm.techDetails.greenspace.paragraph2')"></span>
                      </p>
                    </div>
                    
                    <!-- 折叠面板组件 -->
                    <div class="accordion">
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('greenStep1')">
                          <h4>{{ t('algorithm.techDetails.greenspace.steps.step1.title') }}</h4>
                          <span class="accordion-icon">{{ accordionState.greenStep1 ? '−' : '+' }}</span>
                        </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.greenStep1 }">
                          <div class="document-text">
                            <p class="document-paragraph">
                              <span class="paragraph-indent"></span>{{ t('algorithm.techDetails.greenspace.steps.step1.content') }}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('greenStep2')">
                          <h4>{{ t('algorithm.techDetails.greenspace.steps.step2.title') }}</h4>
                          <span class="accordion-icon">{{ accordionState.greenStep2 ? '−' : '+' }}</span>
                        </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.greenStep2 }">
                          <div class="document-text">
                            <p class="document-paragraph">
                              <span class="paragraph-indent"></span>{{ t('algorithm.techDetails.greenspace.steps.step2.content') }}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('greenStep3')">
                          <h4>{{ t('algorithm.techDetails.greenspace.steps.step3.title') }}</h4>
                          <span class="accordion-icon">{{ accordionState.greenStep3 ? '−' : '+' }}</span>
                        </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.greenStep3 }">
                          <div class="document-text">
                            <p class="document-paragraph">
                              <span class="paragraph-indent"></span>{{ t('algorithm.techDetails.greenspace.steps.step3.content') }}
                            </p>
                            <div class="formula-container">
                              <p class="formula">{{ t('algorithm.techDetails.greenspace.steps.step3.formula') }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="accordion-item">
                        <div class="accordion-header" @click="toggleAccordion('greenStep4')">
                          <h4>{{ t('algorithm.techDetails.greenspace.steps.step4.title') }}</h4>
                          <span class="accordion-icon">{{ accordionState.greenStep4 ? '−' : '+' }}</span>
                        </div>
                        <div class="accordion-content" :class="{ 'active': accordionState.greenStep4 }">
                          <div class="document-text">
                            <p class="document-paragraph">
                              <span class="paragraph-indent"></span>{{ t('algorithm.techDetails.greenspace.steps.step4.content') }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="image-container">
                    <img :src="getImagePath(t('algorithm.techDetails.greenspace.imagePath'))" :alt="t('algorithm.techDetails.greenspace.imageAlt')" class="tech-image" />
                    <p class="image-caption">{{ t('algorithm.techDetails.greenspace.imageCaption') }}</p>
                  </div>
                </div>
              </div>
              
              <!-- 数字孪生 Tab -->
              <div v-if="activeTab === 'digital'" class="tab-pane">
                <div class="content-wrapper">
                  <div class="text-content">
                    <h4>{{ t('algorithm.techDetails.digital.title') }}</h4>
                    <div class="document-text">
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>
                        <span v-html="renderRichText('algorithm.techDetails.digital.paragraph1')"></span>
                      </p>
                      <p class="document-paragraph">
                        <span class="paragraph-indent"></span>
                        <span v-html="renderRichText('algorithm.techDetails.digital.paragraph2')"></span>
                      </p>
                      <div class="document-list">
                        <li><span class="text-highlight">{{ t('algorithm.techDetails.digital.features.photogrammetry') }}</span></li>
                        <li><span class="text-highlight">{{ t('algorithm.techDetails.digital.features.rendering') }}</span></li>
                        <li><span class="text-highlight">{{ t('algorithm.techDetails.digital.features.fusion') }}</span></li>
                        <li><span class="text-highlight">{{ t('algorithm.techDetails.digital.features.interaction') }}</span></li>
                      </div>
                    </div>
                  </div>
                  <div class="image-container">
                    <img :src="getImagePath(t('algorithm.techDetails.digital.imagePath'))" :alt="t('algorithm.techDetails.digital.imageAlt')" class="tech-image" />
                    <p class="image-caption">{{ t('algorithm.techDetails.digital.imageCaption') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 项目导航模块 -->
      <section class="mac-section">
        <h2 class="section-title">{{ t('algorithm.exploration.title') }}</h2>
        <div class="mac-card navigation-buttons-container">
          <div class="navigation-description">
            <div class="document-text">
              <p class="document-paragraph">
                <span class="paragraph-indent"></span>{{ t('algorithm.exploration.description') }}
              </p>
            </div>
          </div>
          <div class="navigation-buttons">
            <router-link to="/model" class="navigation-button model-button">
              <div class="button-icon">🏙️</div>
              <div class="button-content">
                <h3>{{ t('algorithm.exploration.model3d.title') }}</h3>
                <p>{{ t('algorithm.exploration.model3d.description') }}</p>
              </div>
              <div class="button-arrow">→</div>
            </router-link>
            
            <router-link to="/data" class="navigation-button data-button">
              <div class="button-icon">📊</div>
              <div class="button-content">
                <h3>{{ t('algorithm.exploration.dataViz.title') }}</h3>
                <p>{{ t('algorithm.exploration.dataViz.description') }}</p>
              </div>
              <div class="button-arrow">→</div>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// 导入必要的Vue和i18n组件
import { useI18n } from 'vue-i18n';
import { ref, reactive, computed } from 'vue';
import ZoomableMermaid from '../components/ZoomableMermaid.vue';

// 获取i18n实例
const { t, locale } = useI18n();

// 技术详情标签页状态
const activeTab = ref('detection');

// 数据采样方法标签页状态
const samplingMethodTab = ref('c1f1');

// 折叠面板状态管理
const accordionState = reactive({
  multiSource: true,  // 默认展开多源数据部分
  videoData: false,
  parkingStep1: false,
  parkingStep2: false,
  parkingStep3: false,
  parkingStep4: false,
  greenStep1: false,   // 新增：绿地闯入检测相关
  greenStep2: false,   // 新增：绿地闯入检测相关
  greenStep3: false,   // 新增：绿地闯入检测相关
  greenStep4: false,   // 新增：绿地闯入检测相关
  c1f1Implementation: false,
  c1f1Applications: true, // 默认展开应用场景
  c1fnImplementation: false,
  c1fnApplications: true,
  cmf1Implementation: false,
  cmf1Applications: true,
  cmfnImplementation: false,
  cmfnApplications: true
});

// 添加层级详情状态管理
const layerDetailState = reactive({
  perception: false,  // 感知层详情初始为关闭状态
  analysis: false,    // 分析层详情初始为关闭状态
  execution: false    // 执行层详情初始为关闭状态
});

// 切换折叠面板状态
const toggleAccordion = (key) => {
  accordionState[key] = !accordionState[key];
};

// 切换层级详情显示状态
const toggleLayerDetail = (key) => {
  layerDetailState[key] = !layerDetailState[key];
};

// 获取图片路径的方法
const getImagePath = (relativePath) => {
  return `../assets/${relativePath}`;
};

// 获取本地化图片路径的方法（为特定需要中英文不同版本的图片）
const getLocalizedImagePath = (basePath) => {
  // 需要根据当前语言选择不同版本的图片
  // YOLOv5检测效果图和数字孪生模型图使用相同路径
  // 其他图片根据语言选择不同版本
  const lang = locale.value === 'zh' ? '_zh' : '_en';
  return `../assets/${basePath}${lang}.png`;
};

// 流程图定义 - 视频数据流程图
const flowchartVideoDefinition = computed(() => `
flowchart LR
  A["${t('algorithm.flowcharts.videoData.title')}"]

  A --> B["${t('algorithm.flowcharts.videoData.dataCollection')}"]
  A --> C["${t('algorithm.flowcharts.videoData.dataAnalysis')}"]
  A --> D["${t('algorithm.flowcharts.videoData.dataDecision')}"]

  subgraph ${t('algorithm.flowcharts.videoData.dataCollectionSub')}
    B --> B1["${t('algorithm.flowcharts.videoData.realTimeData')}"]
    B --> B2["${t('algorithm.flowcharts.videoData.fullAreaData')}"]
    B --> B3["${t('algorithm.flowcharts.videoData.frontendRecognition')}"]
    B --> B4["${t('algorithm.flowcharts.videoData.dataPreprocessing')}"]
  end

  subgraph ${t('algorithm.flowcharts.videoData.dataAnalysisSub')}
    C --> C1["${t('algorithm.flowcharts.videoData.trafficFlow')}"]
    C --> C2["${t('algorithm.flowcharts.videoData.spaceUsage')}"]
    C --> C3["${t('algorithm.flowcharts.videoData.semanticAnalysis')}"]
  end

  subgraph ${t('algorithm.flowcharts.videoData.dataDecision')}
    D --> D1["${t('algorithm.flowcharts.videoData.designDecision')}"]
    D --> D2["${t('algorithm.flowcharts.videoData.dynamicManagement')}"]
  end

  subgraph ${t('algorithm.flowcharts.videoData.designDecisionSub')}
    D1 --> D1a["${t('algorithm.flowcharts.videoData.communityRenovation')}"]
    D1 --> D1b["${t('algorithm.flowcharts.videoData.historicRenovation')}"]
    D1 --> D1c["${t('algorithm.flowcharts.videoData.industrialRenovation')}"]

    D1a --> D1a1["${t('algorithm.flowcharts.videoData.publicSpaceRenovation')}"]
    D1a --> D1a2["${t('algorithm.flowcharts.videoData.infrastructureAdd')}"]
    D1a --> D1a3["${t('algorithm.flowcharts.videoData.deliveryStation')}"]

    D1b --> D1b1["${t('algorithm.flowcharts.videoData.historicEvaluation')}"]
    D1c --> D1c1["${t('algorithm.flowcharts.videoData.industrialEvaluation')}"]
  end

  subgraph ${t('algorithm.flowcharts.videoData.dynamicManagementSub')}
    D2 --> D2a["${t('algorithm.flowcharts.videoData.parkingManagement')}"]
    D2 --> D2b["${t('algorithm.flowcharts.videoData.trafficControl')}"]
    D2 --> D2c["${t('algorithm.flowcharts.videoData.congestionStatus')}"]
    D2 --> D2d["${t('algorithm.flowcharts.videoData.publicSpaceOccupation')}"]

    D2a --> D2a1["${t('algorithm.flowcharts.videoData.nonMotorManagement')}"]
  end
`);

// 流程图定义 - 多源数据流程图
const flowchartMultiSourceDefinition = computed(() => `
flowchart TD
 subgraph s1["${t('algorithm.flowcharts.multiSource.fixedDevicesSub')}"]
        B1a["${t('algorithm.flowcharts.multiSource.cameraData')}"]
        B1["${t('algorithm.flowcharts.multiSource.fixedDevices')}"]
        B1b["${t('algorithm.flowcharts.multiSource.accessData')}"]
        B1c["${t('algorithm.flowcharts.multiSource.electricityData')}"]
        B1d["${t('algorithm.flowcharts.multiSource.poiData')}"]
  end
 subgraph s2["${t('algorithm.flowcharts.multiSource.mobileDevicesSub')}"]
        B2a["${t('algorithm.flowcharts.multiSource.lbsData')}"]
        B2["${t('algorithm.flowcharts.multiSource.mobileDevices')}"]
        B2b["${t('algorithm.flowcharts.multiSource.internetData')}"]
        B2c["${t('algorithm.flowcharts.multiSource.gpsData')}"]
  end
 subgraph s3["${t('algorithm.flowcharts.multiSource.dataCollectionSub')}"]
        B["${t('algorithm.flowcharts.multiSource.dataCollection')}"]
        s1
        s2
  end
 subgraph s4["${t('algorithm.flowcharts.multiSource.designScenariosSub')}"]
        C1a["${t('algorithm.flowcharts.multiSource.personnelFlow')}"]
        C1["${t('algorithm.flowcharts.multiSource.designScenarios')}"]
        C1b["${t('algorithm.flowcharts.multiSource.functionSatisfaction')}"]
        C1c["${t('algorithm.flowcharts.multiSource.basicSurvey')}"]
  end
 subgraph s5["${t('algorithm.flowcharts.multiSource.managementScenariosSub')}"]
        C2a["${t('algorithm.flowcharts.multiSource.spaceManagement')}"]
        C2["${t('algorithm.flowcharts.multiSource.managementScenarios')}"]
        C2b["${t('algorithm.flowcharts.multiSource.spaceCongestion')}"]
  end
 subgraph s6["${t('algorithm.flowcharts.multiSource.dataAnalysisSub')}"]
        C["${t('algorithm.flowcharts.multiSource.dataAnalysis')}"]
        s4
        s5
  end
 subgraph s7["${t('algorithm.flowcharts.multiSource.designDecisionSub')}"]
        D1a["${t('algorithm.flowcharts.multiSource.designLocation')}"]
        D1["${t('algorithm.flowcharts.multiSource.designDecision')}"]
        D1b["${t('algorithm.flowcharts.multiSource.designMethod')}"]
        D1c["${t('algorithm.flowcharts.multiSource.spaceFunction')}"]
  end
 subgraph s8["${t('algorithm.flowcharts.multiSource.dynamicManagementSub')}"]
        D2a["${t('algorithm.flowcharts.multiSource.parkingManagementIssue')}"]
        D2["${t('algorithm.flowcharts.multiSource.dynamicManagement')}"]
        D2b["${t('algorithm.flowcharts.multiSource.trafficControlIssue')}"]
        D2c["${t('algorithm.flowcharts.multiSource.spaceManagementIssue')}"]
  end
 subgraph s9["${t('algorithm.flowcharts.multiSource.dataDecisionSub')}"]
        D["${t('algorithm.flowcharts.multiSource.dataDecision')}"]
        s7
        s8
  end
    A["${t('algorithm.flowcharts.multiSource.title')}"] --> B & C & D
    B --> B1 & B2
    B1 --> B1a & B1b & B1c & B1d
    B2 --> B2a & B2b & B2c
    C --> C1 & C2
    C1 --> C1a & C1b & C1c
    C2 --> C2a & C2b
    D --> D1 & D2
    D1 --> D1a & D1b & D1c
    D2 --> D2a & D2b & D2c
`);

// 添加这个新函数用于处理文本高亮
const highlightText = (text) => {
  if (!text) return '';
  
  // 定义需要高亮显示的关键词列表及其匹配模式
  const keywordsToHighlight = [
    // 中文关键词
    { word: 'YOLOv5', pattern: /YOLOv[0-9]+/g },
    { word: '倾斜摄影', pattern: /倾斜摄影/g },
    { word: '实时渲染', pattern: /实时渲染/g },
    { word: '数据融合', pattern: /数据融合/g },
    { word: '交互功能', pattern: /交互功能/g },
    { word: '目标检测', pattern: /目标检测/g },
    { word: '行为分析', pattern: /行为分析/g },
    { word: '数字孪生', pattern: /数字孪生/g },
    { word: '三维可视化', pattern: /三维可视化/g },
    { word: '空间可视化', pattern: /空间可视化/g },
    { word: '智能系统', pattern: /智能系统/g },
    { word: '检测算法', pattern: /检测算法/g },
    { word: '停车判定', pattern: /停车判定/g },
    { word: '绿地闯入', pattern: /绿地闯入/g },
    { word: 'Three.js', pattern: /Three\.js/g },
    
    // 高境新苑系统应用模块关键词
    { word: '高境新苑', pattern: /高境新苑/g },
    { word: '智能人车流感知系统', pattern: /智能人车流感知系统/g },
    { word: '社区更新', pattern: /社区更新/g },
    { word: '综合性智能监测平台', pattern: /综合性智能监测平台/g },
    { word: '高清摄像头网络', pattern: /高清摄像头网络/g },
    { word: '人车流动态信息', pattern: /人车流动态信息/g },
    { word: 'AI算法', pattern: /AI算法/g },
    { word: '边缘计算', pattern: /边缘计算/g },
    { word: '云端服务器', pattern: /云端服务器/g },
    { word: '分布式架构', pattern: /分布式架构/g },
    { word: '视频数据', pattern: /视频数据/g },
    { word: '高效性', pattern: /高效性/g },
    { word: '准确性', pattern: /准确性/g },
    
    // 研究框架模块关键词
    { word: '多源数据', pattern: /多源数据/g },
    { word: '城市更新', pattern: /城市更新智能化应用/g },
    { word: '数据采集', pattern: /数据采集/g },
    { word: '数据分析', pattern: /数据分析/g },
    { word: '数据决策', pattern: /数据决策/g },
    { word: '视频数据', pattern: /视频数据/g },
    { word: '人车流量', pattern: /人车流量/g },
    { word: '空间使用率', pattern: /空间使用率/g },
    { word: '设计决策建议', pattern: /设计决策建议/g },
    { word: '动态管理评估', pattern: /动态管理评估/g },
    { word: '老旧小区改造', pattern: /老旧小区改造/g },
    { word: '全周期数据', pattern: /全周期.*数据/g },
    { word: '时空活动模式', pattern: /时空活动模式/g },
    { word: '区域内人车流量', pattern: /区域内人车流量/g },
    { word: '停车管理', pattern: /停车管理/g },
    { word: '人车控流', pattern: /人车控流/g },
    { word: '空间管理', pattern: /空间管理/g },
    
    // 技术详情模块关键词
    { word: '阈值掩模', pattern: /阈值掩模/g },
    { word: '停车状态判定', pattern: /停车状态判定/g },
    { word: '边界框', pattern: /边界框/g },
    { word: '重合度', pattern: /重合度/g },
    { word: '绿地闯入检测', pattern: /绿地闯入检测/g },
    { word: '社区数字孪生', pattern: /社区数字孪生/g },
    { word: '实时处理', pattern: /实时处理/g },
    { word: '高精度检测', pattern: /高精度检测/g },
    { word: '虚拟与现实映射', pattern: /虚拟与现实.*映射/g },
    { word: '掩模图像', pattern: /掩模图像/g },
    { word: '行为判定', pattern: /行为.*判定/g },
    { word: '视频分析系统', pattern: /视频分析系统/g },
    
    // 英文关键词 - 添加高境新苑应用的英文关键词
    { word: 'Gaojing New Garden', pattern: /Gaojing New Garden/gi },
    { word: 'intelligent monitoring platform', pattern: /intelligent monitoring platform/gi },
    { word: 'pedestrian and vehicle flow', pattern: /pedestrian and vehicle flow/gi },
    { word: 'perception system', pattern: /perception system/gi },
    { word: 'community renewal', pattern: /community renewal/gi },
    { word: 'high-definition camera', pattern: /high-definition camera/gi },
    { word: 'dynamic information', pattern: /dynamic information/gi },
    { word: 'distributed architecture', pattern: /distributed architecture/gi },
    { word: 'edge computing', pattern: /edge computing/gi },
    { word: 'cloud servers', pattern: /cloud servers/gi },
    { word: 'object detection', pattern: /object detection/gi },
    { word: 'behavior analysis', pattern: /behavior analysis/gi },
    { word: 'digital twin', pattern: /digital twin/gi },
    { word: 'Three.js', pattern: /Three\.js/gi },
    { word: 'real-time rendering', pattern: /real-time rendering/gi },
    { word: 'data fusion', pattern: /data fusion/gi },
    { word: 'interactive functions', pattern: /interactive functions/gi },
    { word: 'oblique photography', pattern: /oblique photography/gi },
    { word: 'visualization', pattern: /visualization technology/gi },
    { word: 'parking determination', pattern: /parking determination|parking state/gi },
    { word: 'intrusion detection', pattern: /intrusion detection/gi },
    { word: 'real-time monitoring', pattern: /real-time monitoring/gi },
    { word: 'detection accuracy', pattern: /detection accuracy/gi },
    { word: 'spatiotemporal analysis', pattern: /spatiotemporal (analysis|behavior|model)/gi },
    { word: 'YOLOv5', pattern: /YOLOv5/g },
    { word: 'algorithm', pattern: /\balgorithm\b/gi },
    { word: 'computer vision', pattern: /computer vision/gi },
    { word: 'perception system', pattern: /perception system/gi },
    { word: 'analysis layer', pattern: /analysis layer/gi },
    { word: 'execution layer', pattern: /execution layer/gi },
    { word: 'perception layer', pattern: /perception layer/gi },
    { word: 'green space protection', pattern: /green space protection/gi },
    { word: 'spatial mapping', pattern: /spatial mapping/gi },
    { word: 'multi-dimensional', pattern: /multi-dimensional/gi },
    { word: 'community renovation', pattern: /community renovation/gi },
    
    // 研究框架模块英文关键词
    { word: 'multi-source data', pattern: /multi-source data/gi },
    { word: 'urban renewal', pattern: /urban renewal/gi },
    { word: 'data collection', pattern: /data collection/gi },
    { word: 'data analysis', pattern: /data analysis/gi },
    { word: 'data decision', pattern: /data decision/gi },
    { word: 'video data', pattern: /video data/gi },
    { word: 'pedestrian and vehicle flow', pattern: /pedestrian and vehicle flow/gi },
    { word: 'space utilization', pattern: /space utilization/gi },
    { word: 'design decision', pattern: /design decision/gi },
    { word: 'dynamic management', pattern: /dynamic management/gi },
    { word: 'community renovation', pattern: /community renovation/gi },
    { word: 'full-cycle data', pattern: /full-cycle data/gi },
    { word: 'spatiotemporal activity', pattern: /spatiotemporal activity/gi },
    
    // 技术详情模块英文关键词
    { word: 'threshold mask', pattern: /threshold mask/gi },
    { word: 'parking state determination', pattern: /parking state determination/gi },
    { word: 'bounding box', pattern: /bounding box/gi },
    { word: 'intersection ratio', pattern: /intersection ratio/gi },
    { word: 'green space intrusion', pattern: /green space intrusion/gi },
    { word: 'community digital twin', pattern: /community digital twin/gi },
    { word: 'real-time processing', pattern: /real-time processing/gi },
    { word: 'high-precision detection', pattern: /high-precision detection/gi },
    { word: 'virtual and reality mapping', pattern: /virtual and reality mapping/gi },
    { word: 'mask image', pattern: /mask image/gi },
    { word: 'behavior determination', pattern: /behavior determination/gi },
    { word: 'video analysis system', pattern: /video analysis system/gi }
  ];
  
  // 将HTML转换为文本
  let processedText = text;
  
  // 对每个关键词应用高亮处理
  keywordsToHighlight.forEach(({ word, pattern }) => {
    processedText = processedText.replace(pattern, `<span class="text-highlight">${word}</span>`);
  });
  
  return processedText;
};

// 添加渲染富文本的方法
const renderRichText = (key) => {
  const text = t(key);
  return highlightText(text);
};
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

.algorithm-explanation {
  display: flex;
  background-color: #F2F2F7;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  color: #1D1D1F;
}

/* 侧边栏样式 */
.sidebar {
  width: 220px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: saturate(180%) blur(20px);
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.sidebar-header {
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.sidebar-header h3 {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 17px;
  margin: 0;
  color: #42b983;
}

.sidebar-menu {
  padding: 20px 0;
}

.menu-item {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 200ms ease;
  border-radius: 6px;
  margin: 0 8px 4px;
  text-decoration: none;
  color: inherit;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.menu-item.active {
  background-color: rgba(51, 202, 73, 0.1);
}

.menu-item.active svg,
.menu-item.active span {
  color: #42b983;
}

.menu-item svg {
  color: #8E8E93;
}

.menu-item span {
  color: #1D1D1F;
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  position: relative;
}

/* 页面标题 */
.page-title {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 28px;
  margin: 0 0 30px 0;
  color: #1D1D1F;
}

/* MacOS风格卡片 */
.mac-card {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: saturate(180%) blur(20px);
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease;
  padding: 20px;
  margin-bottom: 20px;
}

.mac-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.12);
}

/* 部分标题 */
.mac-section {
  margin-bottom: 30px;
}

.section-title {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 20px;
  margin: 0 0 20px 0;
  color: #1D1D1F;
  position: relative;
}

.section-intro {
  margin-bottom: 20px;
  font-size: 16px;
  color: #5d6778;
}

/* 内容布局 */
.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
}

.text-content {
  flex: 1.5;
  min-width: 300px;
}

.image-container {
  flex: 1;
  min-width: 250px;
  text-align: center;
}

.algo-image {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 200ms ease;
}

.algo-image:hover {
  transform: scale(1.03);
}

.image-caption {
  margin-top: 10px;
  color: #86868B;
  font-size: 13px;
}

/* 列表样式 */
ul {
  padding-left: 20px;
  margin: 15px 0;
}

li {
  margin-bottom: 8px;
  position: relative;
  list-style-type: none;
  padding-left: 20px;
}

li::before {
  content: "•";
  color: #42b983;
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* 方法卡片样式 */
.method-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.method-card {
  padding: 0;
  overflow: hidden;
}

.method-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: rgba(245, 245, 247, 0.7);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.method-header h3 {
  margin: 0;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 17px;
  color: #1D1D1F;
}

.method-tag {
  background-color: rgba(47, 255, 10, 0.1);
  color: #42b983;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.method-content {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.method-desc {
  flex: 2;
  min-width: 300px;
}

.method-desc h4 {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 15px;
  margin: 20px 0 10px;
  color: #42b983;
}

.method-desc p {
  margin: 10px 0;
  line-height: 1.5;
}

.method-visual {
  flex: 1;
  min-width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.method-visual img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 200ms ease;
}

.method-visual img:hover {
  transform: scale(1.03);
}

/* 流程图样式 */
.flow-chart {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
}

.flow-step {
  display: flex;
  align-items: center;
  background-color: rgba(245, 245, 247, 0.7);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  min-width: 180px;
  gap: 12px;
  transition: transform 200ms ease;
}

.flow-step:hover {
  transform: translateY(-3px);
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
}

.step-number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: #42b983;
  color: white;
  border-radius: 15px;
  font-weight: bold;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
}

.step-content h4 {
  margin: 0 0 5px 0;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: #1D1D1F;
}

.step-content p {
  margin: 0;
  font-size: 13px;
  color: #86868B;
}

.flow-arrow {
  font-size: 20px;
  color: #8E8E93;
  display: flex;
  align-items: center;
}

/* 技术优势卡片 */
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 10px;
}

.advantage-card {
  background-color: rgba(245, 245, 247, 0.7);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: transform 200ms ease;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
}

.advantage-icon {
  font-size: 36px;
  margin-bottom: 15px;
}

.advantage-card h4 {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 17px;
  margin: 0 0 10px 0;
  color: #1D1D1F;
}

.advantage-card p {
  color: #5d6778;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}

/* 响应式调整 */
@media (max-width: 900px) {
  .flow-chart {
    flex-direction: column;
    align-items: stretch;
  }
  
  .flow-arrow {
    transform: rotate(90deg);
    margin: 5px 0;
  }
  
  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .algorithm-explanation {
    flex-direction: column;
    height: auto;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    padding: 10px 0;
  }
  
  .sidebar-menu {
    display: flex;
    overflow-x: auto;
    padding: 10px 0;
  }
  
  .menu-item {
    white-space: nowrap;
  }
  
  .main-content {
    padding: 10px;
  }
  
  .content-wrapper {
    flex-direction: column;
  }
  
  .method-content {
    flex-direction: column;
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
  }
}

/* 新增的样式 */
.framework-diagram {
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mermaid-container {
  width: 100%;
  overflow: hidden;
  margin-bottom: 15px;
  margin-left: 10px;
  margin-right: 20px;
}

.framework-image {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
}

/* 方法概览样式 */
.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.method-overview-card {
  padding: 20px;
  text-align: center;
  transition: transform 200ms ease;
}

.method-overview-card:hover {
  transform: translateY(-5px);
}

.method-overview-icon {
  font-size: 36px;
  margin-bottom: 15px;
}

.method-overview-card h4 {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 17px;
  margin: 0 0 10px 0;
  color: #1D1D1F;
}

.method-overview-card p {
  color: #5d6778;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}

/* 系统架构样式 */
.architecture-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

.scrollable-container {
  width: 100%;
  overflow-x: auto;
  padding: 10px 0;
}

.architecture-steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch; /* 改为stretch，让所有元素高度一致 */
  gap: 10px;
  padding: 20px 0;
  position: relative;
}

.arch-step {
  display: flex;
  align-items: flex-start; /* 内容顶部对齐 */
  background-color: rgba(245, 245, 247, 0.7);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  min-width: 180px;
  gap: 12px;
  transition: transform 200ms ease;
  height: calc(100% - 24px); /* 固定高度，减去padding */
}

.arch-step:hover {
  transform: translateY(-3px);
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
}

.arch-step-number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: #42b983;
  color: white;
  border-radius: 15px;
  font-weight: bold;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
}

.arch-step-content h4 {
  margin: 0 0 5px 0;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: #1D1D1F;
}

.arch-step-content p {
  margin: 0;
  font-size: 13px;
  color: #86868B;
}

.arch-step-arrow {
  font-size: 20px;
  color: #8E8E93;
  display: flex;
  align-items: center;
  align-self: center; /* 添加这一行，使箭头自身居中对齐 */
  margin-top: 12px; /* 向下调整一些，使其更居中 */
}

/* 技术详情Tab样式 */
.tech-details-tabs {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tab-buttons {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.tab-button {
  padding: 10px 20px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
  color: #5d6778;
  position: relative;
  transition: color 0.3s;
}

.tab-button.active {
  color: #42b983;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #42b983;
}

.tab-content {
  padding: 10px 0;
}

.tab-pane {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.formula-container {
  background-color: rgba(245, 245, 247, 0.7);
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
}

.formula {
  font-family: monospace;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;
}

.tech-yolov5-image {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
}

.tech-image {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
}

/* 响应式调整 */
@media (max-width: 900px) {
  .architecture-steps {
    flex-direction: column;
    align-items: stretch;
  }
  
  .arch-step-arrow {
    transform: rotate(90deg);
    margin: 5px 0;
  }
  
  .methods-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .methods-grid {
    grid-template-columns: 1fr;
  }
  
  .tab-button {
    padding: 10px 15px;
    font-size: 13px;
  }

  .architecture-steps {
    flex-direction: column;
    align-items: center;
  }

  .arch-step-arrow {
    transform: rotate(90deg);
    margin: 10px 0;
    align-self: center;
  }
}

/* 添加折叠面板样式 */
.accordion {
  width: 100%;
  margin: 15px 0;
}

.accordion-item {
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background-color: rgba(255, 255, 255, 0.7);
  transition: box-shadow 0.3s ease;
}

.accordion-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: rgba(245, 245, 247, 0.7);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
  border-left: 4px solid #42b983;
}

.accordion-header:hover {
  background-color: rgba(66, 185, 131, 0.1);
}

.accordion-header h4 {
  margin: 0;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1D1D1F;
  letter-spacing: 0.01em;
}

.accordion-icon {
  font-size: 18px;
  font-weight: bold;
  color: #42b983;
  transition: transform 0.2s ease;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  padding: 0 15px;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.accordion-content.active {
  max-height: 800px; /* 增加高度以适应更多内容 */
  padding: 20px;
}

.accordion-content p {
  margin: 0;
  line-height: 1.8;
  color: #333333;
  text-align: justify;
  hyphens: auto;
}

.document-text {
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', sans-serif;
  line-height: 1.8;
  color: #333333;
  text-align: justify;
  hyphens: auto;
}

.document-paragraph {
  margin-bottom: 1em;
  text-indent: 0;
  font-size: 15px;
}

.paragraph-indent {
  display: inline-block;
  width: 2em;
}

.text-highlight {
  font-weight: 600;
  color: #2c6e49;
}

.document-list {
  margin: 0.8em 0 1em 2em;
  padding-left: 1em;
}

.document-list li {
  position: relative;
  list-style-type: none;
  margin-bottom: 0.5em;
  padding-left: 1em;
}

.document-list li::before {
  content: "•";
  color: #2c6e49;
  font-weight: bold;
  position: absolute;
  left: -1em;
}

/* 新增的样式 */
.method-tag-inline {
  display: inline-block;
  background-color: rgba(47, 255, 10, 0.1);
  color: #42b983;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 15px;
}

/* 添加层级详情按钮和容器样式 */
.layer-detail-button {
  margin-top: 8px;
  padding: 5px 12px;
  border-radius: 15px;
  background-color: #42b983;
  color: white;
  border: none;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.layer-detail-button:hover {
  background-color: #38a573;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.layer-detail-container {
  width: 100%;
  margin: 20px 0;
  flex-basis: 100%;
  order: 4; /* 确保详情容器始终在所有步骤之后 */
}

.layer-detail-card {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.layer-detail-header {
  padding: 15px 20px;
  background-color: rgba(245, 245, 247, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.layer-detail-header h4 {
  margin: 0;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #1D1D1F;
}

.layer-detail-close {
  background: none;
  border: none;
  font-size: 20px;
  color: #8E8E93;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  transition: all 0.2s ease;
}

.layer-detail-close:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #FF3B30;
}

.layer-detail-content {
  padding: 20px;
}

.layer-detail-image {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 20px;
}

.layer-detail-description {
  color: #333;
  font-size: 14px;
  line-height: 1.6;
}

.layer-detail-description ul {
  padding-left: 20px;
  margin: 15px 0;
}

.layer-detail-description li {
  margin-bottom: 8px;
}

/* 人车流感知系统样式 */
.perception-system-container {
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: flex-start;
}

.perception-text {
  flex: 1;
  padding-right: 30px;
}

.perception-visuals {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.perception-subtitle {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #1D1D1F;
  margin: 0 0 15px 0;
  position: relative;
  padding-left: 15px;
}

.perception-subtitle::before {
  content: '';
  position: absolute;
  left: 0;
  top: 5px;
  height: 80%;
  width: 4px;
  background-color: #42b983;
  border-radius: 2px;
}

.perception-image-container {
  margin-top: 45px; /* 添加顶部边距，与文本标题对齐 */
}

.perception-image {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.image-caption {
  text-align: center;
  color: #86868B;
  font-size: 14px;
  margin-top: 10px;
}

@media (max-width: 900px) {
  .perception-system-container {
    flex-direction: column;
  }
  
  .perception-text {
    padding-right: 0;
  }
  
  .perception-visuals {
    margin-top: 20px;
  }
  
  .perception-image-container {
    margin-top: 0;
  }
}

.nested-document-list {
  margin-left: 1.5em;
  margin-bottom: 1em;
  list-style-type: disc;
}

.nested-document-list li {
  margin-bottom: 0.5em;
  line-height: 1.6;
  text-indent: 0;
  padding-left: 0.5em;
}

/* 项目导航模块样式 */
.navigation-buttons-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.navigation-description {
  margin-bottom: 10px;
}

.navigation-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.navigation-button {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 25px;
  border-radius: 12px;
  text-decoration: none;
  color: #1D1D1F;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
  max-width: 400px;
}

.model-button {
  background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
  border-left: 5px solid #43A047;
}

.data-button {
  background: linear-gradient(135deg, #E3F2FD, #BBDEFB);
  border-left: 5px solid #1E88E5;
}

.navigation-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.button-icon {
  font-size: 32px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}

.button-content {
  flex: 1;
}

.button-content h3 {
  margin: 0 0 5px 0;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 18px;
}

.button-content p {
  margin: 0;
  font-size: 14px;
  color: #5d6778;
}

.button-arrow {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
}

.navigation-button:hover .button-arrow {
  transform: translateX(5px);
  color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 768px) {
  .navigation-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .navigation-button {
    width: 100%;
  }
}

/* 修改高亮样式效果 */
:deep(.text-highlight) {
  font-weight: 600;
  color: #2c6e49; /* 绿色 */
  padding: 0 4px;
  border-radius: 3px;
  transition: all 0.2s ease;
}

:deep(.text-highlight:hover) {
  color: #1e4e33; /* 略微加深文字颜色 */
}

/* 添加段落样式美化 */
.document-paragraph {
  margin-bottom: 1.2em;
  text-indent: 0;
  font-size: 15px;
  line-height: 1.8;
  letter-spacing: 0.01em;
}

/* 添加视觉舒适度的阅读宽度限制 */
.document-text {
  max-width: 100%;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', sans-serif;
  line-height: 1.8;
  color: #333333;
  text-align: justify;
  hyphens: auto;
}
</style> 