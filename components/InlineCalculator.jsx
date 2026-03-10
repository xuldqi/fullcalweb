'use client';

import { useEffect, useRef, useState } from 'react';

function applyTranslations(root) {
  if (!root || !window.i18n) {
    return;
  }

  root.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (key) {
      element.textContent = window.i18n.t(key);
    }
  });

  root.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (key) {
      element.placeholder = window.i18n.t(key);
    }
  });
}

function applyPresetFields(root, presetFields = {}) {
  if (!root || !presetFields) {
    return;
  }

  Object.entries(presetFields).forEach(([id, value]) => {
    const element = root.querySelector(`#${id}`);
    if (!element) {
      return;
    }

    element.value = value;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

export default function InlineCalculator({ calculatorType, presetFields }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const mountCalculator = () => {
      if (cancelled) {
        return;
      }

      const app = window.fullCalApp;
      const container = containerRef.current;

      if (!app || !container || typeof app.getCalculatorContent !== 'function' || typeof app.setupCalculator !== 'function') {
        attempts += 1;
        if (attempts < 80) {
          window.setTimeout(mountCalculator, 100);
        } else {
          setStatus('error');
        }
        return;
      }

      container.innerHTML = app.getCalculatorContent(calculatorType);
      applyTranslations(container);
      app.setupCalculator(calculatorType);

      if (presetFields && Object.keys(presetFields).length > 0) {
        window.setTimeout(() => {
          if (!cancelled) {
            applyPresetFields(container, presetFields);
            applyTranslations(container);
          }
        }, 220);
      }

      setStatus('ready');
    };

    mountCalculator();

    return () => {
      cancelled = true;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [calculatorType, presetFields]);

  return (
    <div className="inline-calculator-shell">
      {status === 'loading' ? <div className="inline-calculator-state">Loading calculator…</div> : null}
      {status === 'error' ? (
        <div className="inline-calculator-state inline-calculator-error">
          Calculator failed to initialize. Please refresh the page.
        </div>
      ) : null}
      <div
        ref={containerRef}
        className="inline-calculator-content"
        style={{ display: status === 'ready' ? 'block' : 'none' }}
      />
    </div>
  );
}
