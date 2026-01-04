// ==UserScript==
// @name         jy_script
// @namespace    http://tampermonkey.net/
// @version      2026-01-04
// @description  Dark Mode & PPT
// @author       derjoker
// @match        https://www.jyeoo.com/math2/paper/detail/*
// @match        https://www.jyeoo.com/math2/report/detail/*
// @require      https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs/dist/pptxgen.bundle.js
// @require      https://html2canvas.hertzen.com/dist/html2canvas.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jyeoo.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  console.log("Hello Jyeoo! Version: " + GM_info.script.version);

  // 检查html2canvas是否加载成功
  function checkHtml2Canvas() {
    if (typeof html2canvas === 'undefined') {
      console.error('html2canvas未加载成功，将使用文本模式');
      return false;
    }
    return true;
  }

  // 等待页面加载完成
  window.addEventListener('load', function () {
    // 添加PPT生成按钮
    addPPTButton();
  });

  function addPPTButton() {
    // 如果按钮已存在，先移除
    const existingBtn = document.querySelector('#jyeoo-ppt-btn');
    if (existingBtn) {
      existingBtn.remove();
    }

    // 创建下载按钮
    const downloadBtn = document.createElement('button');
    downloadBtn.id = 'jyeoo-ppt-btn';
    downloadBtn.innerHTML = '📸 截图生成PPT';
    downloadBtn.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      background: #E91E63;
      color: white;
      border: none;
      padding: 12px 18px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      transition: all 0.3s ease;
    `;

    // 添加悬停效果
    downloadBtn.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
    });

    downloadBtn.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    });

    downloadBtn.addEventListener('click', generatePPTWithScreenshots);

    document.body.appendChild(downloadBtn);
    console.log('PPT截图生成按钮已添加');
  }

  async function generatePPTWithScreenshots() {
    try {
      console.log('开始生成截图PPT...');

      // 禁用按钮防止重复点击
      const btn = document.querySelector('#jyeoo-ppt-btn');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ 截图中...';
        btn.style.background = '#9E9E9E';
      }

      // 检查html2canvas是否可用
      const canUseScreenshot = checkHtml2Canvas();

      if (!canUseScreenshot) {
        alert('截图功能不可用，将使用文本模式生成PPT');
        generatePPT();
        return;
      }

      // 创建新的PPT演示文稿
      const pres = new PptxGenJS();

      // 设置PPT属性
      pres.layout = 'LAYOUT_WIDE';
      pres.rtlMode = false;

      // 提取题目信息
      // 提取题目信息
      const paperTitle = extractPaperTitle();
      const items = extractQuestions();
      const questionCount = items.filter(i => i.type === 'question').length;

      console.log(`找到 ${items.length} 个项目 (${questionCount} 个题目)`);

      if (items.length === 0) {
        alert('未找到题目内容，请检查页面结构。\n可以尝试刷新页面或检查题目是否已加载。');
        resetButton();
        return;
      }

      // 添加标题页
      addTitleSlide(pres, paperTitle, items.length);

      // 显示进度
      if (btn) {
        btn.innerHTML = `⏳ 处理中 (0/${items.length})`;
      }

      // 为每个项目创建截图并添加到PPT
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // 更新进度
        if (btn) {
          btn.innerHTML = `⏳ 处理中 (${i + 1}/${items.length})`;
        }

        if (item.type === 'section') {
          console.log(`添加章节页面: ${item.text}`);
          addSectionSlide(pres, item.text);
          continue;
        }

        console.log(`处理第 ${i + 1} 个项目截图...`);

        try {
          await addQuestionSlideWithScreenshot(pres, item, i + 1, items.length);
        } catch (error) {
          console.error(`项目 ${i + 1} 截图失败:`, error);
          // 如果截图失败，使用文本模式
          addQuestionSlide(pres, item, i + 1, items.length);
        }
      }

      // 生成文件名（清理非法字符）
      const cleanTitle = paperTitle ? paperTitle.replace(/[<>:"/\\|?*]/g, '_') : 'jyeoo_questions';
      const fileName = `${cleanTitle}_截图_${new Date().getTime()}.pptx`;

      // 下载PPT
      pres.writeFile({ fileName: fileName });

      console.log('截图PPT生成完成！文件名:', fileName);
      alert(`截图PPT生成完成！\n共 ${items.length} 页题目截图\n文件名: ${fileName}`);

      // 恢复按钮状态
      resetButton();

    } catch (error) {
      console.error('生成截图PPT时出错:', error);
      alert('生成截图PPT时出错：' + error.message + '\n请查看控制台获取详细信息');
      resetButton();
    }
  }

  async function addQuestionSlideWithScreenshot(pres, question, currentIndex, totalCount) {
    const slide = pres.addSlide();

    // 设置幻灯片背景
    slide.background = { color: 'FFFFFF' };

    // 查找题目对应的DOM元素
    const questionElement = findQuestionElement(question);

    if (questionElement) {
      try {
        // 使用html2canvas截图，忽略div.pt2_area元素
        const canvas = await html2canvas(questionElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#FFFFFF',
          logging: true,
          onclone: function (clonedDoc) {
            // 在克隆的文档中手动移除pt2_area元素
            const elementsToRemove = clonedDoc.querySelectorAll('[class*="pt2_area"]');
            elementsToRemove.forEach(el => {
              console.log('移除元素:', el);
              el.remove();
            });
          }
        });

        // 将canvas转换为base64图片
        const imageData = canvas.toDataURL('image/png');

        // 计算图片在PPT中的尺寸（与页面等宽，保持比例）
        const pageWidth = 13.33; // PPT宽屏布局实际宽度（16:9比例）
        const pageHeight = 7.5;   // PPT宽屏布局实际高度
        const maxHeight = 6.0;   // 最大高度（留出页眉页脚空间）
        const aspectRatio = canvas.width / canvas.height;

        let imgWidth = pageWidth;
        let imgHeight = pageWidth / aspectRatio;

        // 如果高度超过最大高度，按高度缩放
        if (imgHeight > maxHeight) {
          imgHeight = maxHeight;
          imgWidth = maxHeight * aspectRatio;
        }

        // 计算居中位置
        const xPos = (pageWidth - imgWidth) / 2;
        const yPos = 0.8; // 从页面顶部开始，留出更多空间

        // 添加截图到PPT（与页面等宽）
        slide.addImage({
          data: imageData,
          x: xPos,
          y: yPos,
          w: imgWidth,
          h: imgHeight
        });

        console.log(`第 ${currentIndex} 题截图成功，尺寸: ${canvas.width}x${canvas.height}, PPT中尺寸: ${imgWidth}x${imgHeight}`);

      } catch (error) {
        console.error(`第 ${currentIndex} 题截图失败:`, error);
        throw error; // 重新抛出错误，让上层处理
      }
    } else {
      console.warn(`未找到第 ${currentIndex} 题对应的DOM元素，使用文本模式`);
      // 如果找不到元素，使用文本模式
      const formattedText = formatQuestionText(question.text, 20);
      slide.addText(formattedText, {
        x: 0.7,
        y: 1.3,
        w: 11.93, // 修正为正确的PPT宽度减去边距
        h: 4.4,
        fontSize: 16,
        lineSpacing: 1.3,
        color: '2C3E50',
        fontFace: '宋体',
        align: 'left',
        valign: 'top'
      });
    }
  }

  function findQuestionElement(question) {
    if (question.element) return question.element;

    // 根据存储的选择器信息查找元素
    if (question.selector && question.index) {
      const elements = document.querySelectorAll(question.selector);
      if (elements.length >= question.index) {
        return elements[question.index - 1];
      }
    }

    // 如果选择器方法失败，尝试通过内容匹配
    const allElements = document.querySelectorAll('div, p, fieldset, section');
    for (const element of allElements) {
      const text = element.textContent || '';
      if (text.includes(question.text.substring(0, 50))) {
        return element;
      }
    }

    return null;
  }

  function resetButton() {
    const btn = document.querySelector('#jyeoo-ppt-btn');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '📸 截图生成PPT';
      btn.style.background = '#E91E63';
    }
  }

  // 保留原有的文本模式函数作为备用
  function generatePPT() {
    try {
      console.log('开始生成文本PPT...');

      // 禁用按钮防止重复点击
      const btn = document.querySelector('#jyeoo-ppt-btn');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ 处理中...';
        btn.style.background = '#9E9E9E';
      }

      // 创建新的PPT演示文稿
      const pres = new PptxGenJS();

      // 设置PPT属性
      pres.layout = 'LAYOUT_WIDE';
      pres.rtlMode = false;

      // 提取题目信息
      // 提取题目信息
      const paperTitle = extractPaperTitle();
      const items = extractQuestions();

      console.log(`找到 ${items.length} 个项目`);

      if (items.length === 0) {
        alert('未找到内容。');
        resetButton();
        return;
      }

      // 添加标题页
      addTitleSlide(pres, paperTitle, items.length);

      // 为每个项目创建一页
      items.forEach((item, index) => {
        if (item.type === 'section') {
          addSectionSlide(pres, item.text);
        } else {
          addQuestionSlide(pres, item, index + 1, items.length);
        }
      });

      // 生成文件名（清理非法字符）
      const cleanTitle = paperTitle ? paperTitle.replace(/[<>:"/\\|?*]/g, '_') : 'jyeoo_questions';
      const fileName = `${cleanTitle}_文本_${new Date().getTime()}.pptx`;

      // 下载PPT
      pres.writeFile({ fileName: fileName });

      console.log('文本PPT生成完成！文件名:', fileName);
      alert(`文本PPT生成完成！\n共 ${items.length} 页题目\n文件名: ${fileName}`);

      // 恢复按钮状态
      resetButton();

    } catch (error) {
      console.error('生成文本PPT时出错:', error);
      alert('生成文本PPT时出错：' + error.message + '\n请查看控制台获取详细信息');
      resetButton();
    }
  }

  function addQuestionSlide(pres, question, currentIndex, totalCount) {
    const slide = pres.addSlide();

    // 设置幻灯片背景
    slide.background = { color: 'FFFFFF' };

    // 题目文本
    const formattedText = formatQuestionText(question.text, 20);
    slide.addText(formattedText, {
      x: 0.7,
      y: 1.3,
      w: 8.6,
      h: 4.4,
      fontSize: 16,
      lineSpacing: 1.3,
      color: '2C3E50',
      fontFace: '宋体',
      align: 'left',
      valign: 'top'
    });
  }

  // 保留其他辅助函数（extractPaperTitle, extractQuestions, addTitleSlide, formatQuestionText等）
  function extractPaperTitle() {
    const titleSelectors = [
      'h1', '.paper-title', '.title', '.paper-header h1', '.content h1',
      '.paper-name', '.exam-title', '#paperTitle'
    ];

    for (const selector of titleSelectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent && element.textContent.trim()) {
        const title = element.textContent.trim();
        console.log('找到标题:', title, '选择器:', selector);
        return title;
      }
    }

    const pageTitle = document.title.replace(' - 菁优网', '').trim();
    console.log('使用页面标题:', pageTitle);
    return pageTitle;
  }

  function extractQuestions() {
    const questions = [];
    const questionSelectors = [
      '.q-body', '.question-content', '.question', '.q-container',
      '.q-item', '.question-item', 'fieldset', '.quesiton',
      '.quiz-content', '.problem'
    ];

    for (const selector of questionSelectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        console.log(`使用选择器 "${selector}" 找到 ${elements.length} 个元素`);

        elements.forEach((element, index) => {
          if (isElementVisible(element)) {
            const questionText = extractQuestionText(element);
            if (questionText && questionText.length > 15) {
              questions.push({
                type: 'question',
                text: questionText,
                html: element.innerHTML,
                index: questions.length + 1,
                selector: selector,
                element: element
              });
              console.log(`添加题目 ${questions.length}:`, questionText.substring(0, 50) + '...');
            }
          }
        });

        if (questions.length > 0) break;
      }
    }

    if (questions.length === 0) {
      console.log('使用智能方法查找题目...');
      const potentialContainers = document.querySelectorAll([
        'div[class*="q"]', 'div[class*="question"]', 'div[class*="quiz"]',
        'div[class*="problem"]', '.content div', '.main div'
      ].join(','));

      potentialContainers.forEach(element => {
        if (isElementVisible(element) && hasQuestionFeatures(element)) {
          const questionText = extractQuestionText(element);
          if (questionText && questionText.length > 20) {
            questions.push({
              type: 'question',
              text: questionText,
              html: element.innerHTML,
              index: questions.length + 1,
              selector: 'smart-detection',
              element: element
            });
          }
        }
      });
    }

    // 提取章节标题 (Sections)
    const sections = [];
    document.querySelectorAll('h3.ques-type').forEach(element => {
      if (isElementVisible(element)) {
        sections.push({
          type: 'section',
          text: element.textContent.trim(),
          element: element
        });
      }
    });

    // 合并并按DOM顺序排序
    const items = [...questions, ...sections];
    items.sort((a, b) => {
      if (a.element && b.element) {
        return (a.element.compareDocumentPosition(b.element) & 4) ? -1 : 1;
      }
      return 0;
    });

    console.log(`最终找到项目数量: ${items.length} (题目: ${questions.length}, 章节: ${sections.length})`);
    return items;
  }

  function addSectionSlide(pres, title) {
    const slide = pres.addSlide();
    slide.background = { color: '#FFFFFF' };

    slide.addText(title, {
      x: 0.5, y: '40%', w: '90%', h: 1.5,
      fontSize: 32, bold: true, align: 'center',
      color: '#E91E63', fontFace: '微软雅黑'
    });
  }

  function isElementVisible(element) {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      element.offsetWidth > 0 &&
      element.offsetHeight > 0;
  }

  function hasQuestionFeatures(element) {
    const text = element.textContent || '';
    return text.includes('题') || text.match(/^\d+[\.、]/) ||
      text.includes('选择') || text.includes('填空') ||
      text.includes('解答') || text.includes('证明') || text.length > 100;
  }

  function extractQuestionText(element) {
    let text = element.textContent || element.innerText || '';
    const clone = element.cloneNode(true);
    const removeSelectors = [
      'script', 'style', 'noscript', 'iframe',
      '.answer', '.solution', '.hint',
      '.options', '.choices', '.actions',
      'button', 'a[href*="answer"]', 'a[href*="solution"]'
    ];

    removeSelectors.forEach(selector => {
      clone.querySelectorAll(selector).forEach(el => el.remove());
    });

    text = clone.textContent || text;
    return cleanQuestionText(text);
  }

  function cleanQuestionText(text) {
    return text
      .replace(/\s+/g, ' ')
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/\s*([。！？；:：])\s*/g, '$1\n')
      .replace(/^\s+|\s+$/g, '')
      .replace(/\n\s*\n/g, '\n')
      .trim();
  }

  function addTitleSlide(pres, title, questionCount) {
    const slide = pres.addSlide();
    slide.background = { color: '#FFFFFF' };

    slide.addText(title || '题目集', {
      x: 0.5, y: 1.5, w: '90%', h: 2.0,
      fontSize: 28, bold: true, align: 'center',
      color: '#006FFF', fontFace: '微软雅黑'
    });
  }

  function formatQuestionText(text, maxLines) {
    let lines = text.split('\n').filter(line => line.trim().length > 0);
    if (lines.length > maxLines) {
      let truncatedLines = [];
      let lineCount = 0;
      for (let i = 0; i < lines.length && lineCount < maxLines - 1; i++) {
        const line = lines[i];
        truncatedLines.push(line);
        lineCount++;
        if (line.trim().endsWith('。') || line.trim().endsWith('．')) break;
      }
      lines = truncatedLines;
      lines.push('...（题目内容过长，已截断）');
    }
    return lines.join('\n');
  }

  console.log('Jyeoo PPT截图生成器已加载');
})();