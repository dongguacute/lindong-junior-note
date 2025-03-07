import { defineConfig } from 'vitepress'
import {
  InlineLinkPreviewElementTransform
} from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import nav from './nav.mts';
import { resolve } from 'path';



// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  markdown: {
    config(md) {
      // 其他 markdown-it 配置...
      md.use(InlineLinkPreviewElementTransform),
        md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`;
          return htmlResult;
        }
    },
  },
  title: "霖冬中考笔记",
  description: "初中生的“葵花宝典”",
  srcDir: "docs",
  lang: "zh-CN",
  vite: {
    plugins: [
      nav,
      GitChangelog({
        // 填写在此处填写您的仓库链接
        repoURL: () => 'https://github.com/lindongnote/lindong-junior-note',
      }),
      GitChangelogMarkdownSection(),
    ],
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        'vitepress',
        '@nolebase/ui',
        '@nolebase/vitepress-plugin-inline-link-preview/client',
      ],
    },
    ssr: {
      noExternal: [
        // 如果还有别的依赖需要添加的话，并排填写和配置到这里即可
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/ui',
        '@nolebase/vitepress-plugin-inline-link-preview',
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
      ],
    },

  },
  themeConfig: {
    logo: '/favicon.ico',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    lastUpdated: {
      text: '最后更新于',
    },
    editLink: {
      text: '在 GitHub 上编辑此页',
      pattern: 'https://github.com/lindongnote/lindong-junior-note/blob/main/docs/:path'
    },
    // 文章翻页
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 移动端 - 外观
    darkModeSwitchLabel: '外观',

    // 移动端 - 返回顶部
    returnToTopLabel: '返回顶部',

    // 移动端 - menu
    sidebarMenuLabel: '菜单',
    // 移动端 - 导航栏
    outlineTitle: '在本页',
    // https://vitepress.dev/reference/default-theme-config


    socialLinks: [
      { icon: 'github', link: 'https://github.com/lindongnote/lindong-junior-note' }
    ],
    footer: {
      message: 'Released under the CC-BY-SA 4.0 License.',
      copyright: 'Copyright © 2023-present 霖冬笔记'
    }
  },
  resolve: {
    alias: {
      '@theme': resolve(__dirname, '.vitepress/theme')
    }
  }
})
