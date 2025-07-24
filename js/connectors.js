document.addEventListener('DOMContentLoaded', () => {
  // 拆字动画
  document.querySelectorAll('.animated-text').forEach(el => {
    const txt = el.textContent.trim();
    el.textContent = '';
    txt.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.textContent = ch;
      span.style.animationDelay = `${i * 0.05}s`;
      el.appendChild(span);
    });
  });

  // 点击中心按钮绘制连线
  const center = document.querySelector('.guide .center');
  const nodes  = document.querySelectorAll('.guide .node');
  const svg    = document.querySelector('.connectors');

  center.addEventListener('click', () => {
    // 清空旧线
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const rect = document.querySelector('.guide').getBoundingClientRect();
    const cr   = center.getBoundingClientRect();
    const cX   = cr.left + cr.width/2  - rect.left;
    const cY   = cr.top  + cr.height/2 - rect.top;

    nodes.forEach(n => {
      const nr = n.getBoundingClientRect();
      const nX = nr.left + nr.width/2  - rect.left;
      const nY = nr.top  + nr.height/2 - rect.top;
      const line = document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1', cX);
      line.setAttribute('y1', cY);
      line.setAttribute('x2', nX);
      line.setAttribute('y2', nY);
      line.setAttribute('stroke', '#ffffff');
      line.setAttribute('stroke-width', '4');
      svg.appendChild(line);
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // —— 原有的拆字 & 连线逻辑 ……

  // —— 模态框逻辑 —— 
  const modal      = document.getElementById('modal');
  const titleEl    = document.getElementById('modal-title');
  const bodyEl     = document.getElementById('modal-body');
  const closeEl    = document.querySelector('.modal-close');
  const cards      = document.querySelectorAll('.type-card');

  cards.forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      titleEl.textContent = card.textContent;
      bodyEl.innerHTML  = card.dataset.text || '';
      modal.classList.add('show');
    });
  });

  closeEl.addEventListener('click', () => {
    modal.classList.remove('show');
  });
  // 点击遮罩区域关闭
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
});
