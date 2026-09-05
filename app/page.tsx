'use client';

import { useRef, useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';

const views = ['FRONT', 'SECTION', 'AXON', 'EXPLODED'];

export default function Home() {
  const [view, setView] = useState(3);
  const [rotation, setRotation] = useState({ x: -12, y: 24 });
  const [zoom, setZoom] = useState(1);
  const drag = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);

  function down(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, rx: rotation.x, ry: rotation.y };
  }

  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    setRotation({
      x: Math.max(-30, Math.min(8, drag.current.rx - (event.clientY - drag.current.y) * .14)),
      y: drag.current.ry + (event.clientX - drag.current.x) * .18,
    });
  }

  return (
    <main className="archive-shell">
      <div className="design-grid" aria-hidden="true" />

      <header className="archive-header">
        <a href="#top" className="mark" aria-label="D—CONSTRUCT home">
          <img src="/assets/logo.gif" alt="디자인대학을 해체시키는 시선" />
        </a>
        <div className="header-code">SPACE DESIGN ARCHIVE / 2026</div>
        <div className="header-meta"><span>PROJECT 01</span><b>SEOUL · KR</b></div>
      </header>

      <section className="archive-board" id="top">
        <section className="visual-field" aria-label="Elevator deconstruction study">
          <div className="visual-heading">
            <p>OBJECT / ELEVATOR</p>
            <h1><img src="/assets/logo-stay.png" alt="디자인대학을 해체시키는 시선" /></h1>
          </div>

          <div className="scale scale-top">0.0&nbsp;&nbsp; 1.2&nbsp;&nbsp; 2.4&nbsp;&nbsp; 3.6&nbsp;&nbsp; 4.8 M</div>
          <div className="scale scale-side">LEVEL 06&nbsp;&nbsp; / &nbsp;&nbsp;+ 24.800</div>
          <div className="radar" aria-hidden="true">
            <span /><span /><span /><span />
          </div>

          <div
            className={`object-stage mode-${view}`}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={() => (drag.current = null)}
            onPointerCancel={() => (drag.current = null)}
          >
            <div className="model" style={{ transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}>
              <div className="cabin">
                <span className="cabin-front" /><span className="cabin-side" /><span className="cabin-top" />
                <span className="door door-a" /><span className="door door-b" />
              </div>
              <div className="panel panel-a"><span>06</span></div>
              <div className="panel panel-b"><span>↑</span></div>
              <div className="shaft-line line-a" /><div className="shaft-line line-b" />
              <div className="pulley pulley-a" /><div className="pulley pulley-b" />
              <div className="counterweight" />
            </div>
          </div>

          <div className="annotation note-a"><b>01</b><span>DOOR SEQUENCE</span><em>OPEN / 1.8 SEC</em></div>
          <div className="annotation note-b"><b>02</b><span>VERTICAL TRACE</span><em>24.8 M / 06 LEVELS</em></div>
          <div className="annotation note-c"><b>03</b><span>SIGHT OVERLAP</span><em>04 SIMULTANEOUS VIEWS</em></div>

          <div className="view-controls" aria-label="View controls">
            <div className="view-tabs">
              {views.map((item, index) => <button key={item} onClick={() => setView(index)} className={view === index ? 'active' : ''}>0{index + 1} / {item}</button>)}
            </div>
            <div className="zoom-controls">
              <button onClick={() => setZoom(Math.min(1.24, zoom + .08))} aria-label="Zoom in"><Plus size={15} /></button>
              <button onClick={() => setZoom(Math.max(.76, zoom - .08))} aria-label="Zoom out"><Minus size={15} /></button>
              <button onClick={() => { setZoom(1); setRotation({ x: -12, y: 24 }); }} aria-label="Reset view"><RotateCcw size={14} /></button>
            </div>
          </div>
        </section>

        <aside className="profile-panel">
          <div className="panel-label"><span>A / PROFILE</span><span>SUBJECT 001</span></div>

          <div className="profile-card">
            <div className="portrait-placeholder" aria-hidden="true">
              <div className="portrait-grid" /><span>A</span>
              <small>INTERVIEW FRAME<br />00:14:28</small>
            </div>
            <dl>
              <div><dt>소속</dt><dd>스페이스디자인학과 / 4학년</dd></div>
              <div><dt>해체 대상</dt><dd>엘리베이터</dd></div>
              <div><dt>키워드</dt><dd>시선 · 이동 · 마주침 · 동시성</dd></div>
            </dl>
          </div>

          <article className="text-section">
            <p>01 / SPATIAL EXPERIENCE</p>
            <h3>디자인대학 공간 경험</h3>
            <div className="section-line"><span>01</span></div>
            <p className="body-copy">엘리베이터는 단순한 이동 공간이 아니다.<br />문이 열리고 닫히는 순간마다 서로 다른 시선과 경험이 교차한다.</p>
          </article>

          <article className="text-section">
            <p>02 / DECONSTRUCTION METHOD</p>
            <h3>해체의 방식</h3>
            <div className="section-line"><span>02</span></div>
            <p className="body-copy">엘리베이터를 여러 위치와 시점에서 바라본 장면으로 분해한다.<br />서로 다른 시선을 한 화면에 중첩해 공간을 다시 구성한다.</p>
          </article>

          <article className="text-section">
            <p>03 / SPATIAL READING</p>
            <h3>해체의 의미</h3>
            <div className="section-line"><span>03</span></div>
            <p className="body-copy">하나의 공간은 하나의 시선으로만 경험되지 않는다.<br />A의 해체는 겹쳐진 경험을 통해 공간을 다시 읽는 과정이다.</p>
          </article>
        </aside>
      </section>

      <footer className="archive-footer"><span>DRAG OBJECT TO ROTATE · SELECT VIEW TO RECONFIGURE</span><span>HEX / 1628D2</span><span>PAGE 01 / 01</span></footer>
    </main>
  );
}
