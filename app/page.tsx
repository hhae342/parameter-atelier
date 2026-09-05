'use client';

import { useRef, useState } from 'react';
import { Grid3X3, Minus, Moon, Plus, RotateCcw, Sun } from 'lucide-react';

const parameters = [
  ['SITE', '37° 33′ N'],
  ['F.A.R', '218.4 %'],
  ['G.F.A', '1,842 M²'],
  ['LEVELS', '06 + B1'],
];

const layers = [
  { name: 'ROOF GARDEN', value: 'L06', tone: 'light' },
  { name: 'PUBLIC FORUM', value: 'L04—05', tone: 'medium' },
  { name: 'STUDIO GRID', value: 'L02—03', tone: 'dark' },
  { name: 'URBAN PLINTH', value: 'L01', tone: 'black' },
];

export default function Home() {
  const [rotation, setRotation] = useState({ x: -16, y: 28 });
  const [zoom, setZoom] = useState(1);
  const [dark, setDark] = useState(false);
  const [activeLayer, setActiveLayer] = useState(1);
  const drag = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, rx: rotation.x, ry: rotation.y };
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    setRotation({
      x: Math.max(-35, Math.min(8, drag.current.rx - (event.clientY - drag.current.y) * 0.16)),
      y: drag.current.ry + (event.clientX - drag.current.x) * 0.2,
    });
  }

  return (
    <main className={dark ? 'site-shell is-dark' : 'site-shell'}>
      <div className="blueprint-grid" aria-hidden="true" />

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Axiom Atelier home">AXIOM<span>®</span></a>
        <div className="project-id"><span>PROJECT</span><strong>AX–041 / SEOUL</strong></div>
        <nav aria-label="Primary navigation">
          <a href="#system">SYSTEM</a><a href="#index">INDEX</a>
          <button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle color mode">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </header>

      <section className="workspace" id="top">
        <div className="hero-title">
          <p>ARCHITECTURE / PARAMETRIC STUDY 01</p>
          <h1>FORM<br />FOLLOWS<br /><i>PARAMETER.</i></h1>
        </div>

        <aside className="coordinates" aria-label="Project parameters">
          <div className="coord-title"><Grid3X3 size={14} /> LIVE PARAMETERS</div>
          {parameters.map(([label, value]) => <div className="coord-row" key={label}><span>{label}</span><b>{value}</b></div>)}
        </aside>

        <div
          className="model-stage"
          role="img"
          aria-label="Interactive abstract architectural massing model. Drag to rotate."
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
        >
          <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
          <div className="model-shadow" aria-hidden="true" />
          <div className="massing" style={{ transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}>
            {layers.map((layer, index) => (
              <button
                key={layer.name}
                className={`slab slab-${index + 1} ${layer.tone} ${activeLayer === index ? 'active' : ''}`}
                onClick={(event) => { event.stopPropagation(); setActiveLayer(index); }}
                aria-label={`Select ${layer.name}`}
              >
                <span className="face front" /><span className="face back" />
                <span className="face right" /><span className="face left" />
                <span className="face top" /><span className="face bottom" />
              </button>
            ))}
            <span className="core" aria-hidden="true" />
          </div>
          <span className="axis axis-x">X</span><span className="axis axis-y">Y</span>
          <div className="model-controls" aria-label="Model controls">
            <button onClick={() => setZoom(Math.min(1.28, zoom + 0.08))} aria-label="Zoom in"><Plus size={16} /></button>
            <button onClick={() => setZoom(Math.max(.72, zoom - 0.08))} aria-label="Zoom out"><Minus size={16} /></button>
            <button onClick={() => { setRotation({ x: -16, y: 28 }); setZoom(1); }} aria-label="Reset view"><RotateCcw size={15} /></button>
          </div>
          <p className="drag-hint">DRAG TO ROTATE · SELECT A VOLUME</p>
        </div>

        <div className="callout callout-a"><span>01</span><p>ROTATED FLOOR PLATES<br /><b>+ 7.5° / LEVEL</b></p></div>
        <div className="callout callout-b"><span>02</span><p>OPEN CIVIC VOID<br /><b>AREA 312 M²</b></p></div>
        <div className="callout callout-c"><span>03</span><p>SOLAR ENVELOPE<br /><b>AZIMUTH 186°</b></p></div>

        <aside className="layer-index" id="index">
          <div className="index-head"><span>BUILDING INDEX</span><span>04 VOLUMES</span></div>
          {layers.map((layer, index) => (
            <button key={layer.name} onClick={() => setActiveLayer(index)} className={activeLayer === index ? 'selected' : ''}>
              <span>0{index + 1}</span><b>{layer.name}</b><em>{layer.value}</em>
            </button>
          ))}
        </aside>

        <div className="status-box" id="system">
          <span className="pulse" /><div><b>MODEL STATUS / ACTIVE</b><p>GEOMETRY RESOLVED AT 1:200</p></div>
        </div>

        <div className="selected-data">
          <span>SELECTED VOLUME</span><strong>0{activeLayer + 1} — {layers[activeLayer].name}</strong>
          <p>STRUCTURAL GRID 8.4 × 8.4 M<br />CLEAR HEIGHT {(3.6 + activeLayer * .4).toFixed(1)} M</p>
        </div>
      </section>

      <footer><span>AXIOM ATELIER © 2026</span><span>DESIGNING SYSTEMS FOR UNFINISHED FUTURES</span><span>37.5665° N / 126.9780° E</span></footer>
    </main>
  );
}
