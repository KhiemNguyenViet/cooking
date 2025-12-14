import React, { useState, useEffect } from 'react';

function Checklist({ ingredients }) {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('checklist');
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('checklist', JSON.stringify(checked));
  }, [checked]);

  const toggle = (item) => {
    setChecked(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  return (
    <section className="checklist" aria-label="Kiểm tra nguyên liệu">
      <h2>Kiểm tra nguyên liệu</h2>
      <ul>
        {ingredients.map((item, idx) => (
          <li key={idx}>
            <label>
              <input
                type="checkbox"
                checked={checked.includes(item)}
                onChange={() => toggle(item)}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Checklist;
