import { useEffect, useMemo, useState } from 'react';
import './App.css';

const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

function App() {
  const [selected, setSelected] = useState(new Set());
  const arr = useMemo(() => BOX_DATA.flat(Infinity), []);

  const onBoxClick = (e) => {
    const { target } = e;

    const index = target.getAttribute('data-index');
    const status = target.getAttribute('data-status');

    if (status === 'hidden') {
      return;
    }

    setSelected((prev) => {
      return new Set(prev.add(index));
    });
  };

  useEffect(() => {
    const arraySize = arr.filter((item) => !!item);
    if (selected.size === arraySize.length) {
      unload();
    }
  }, [selected]);

  const unload = () => {
    const keys = Array.from(selected.keys());
    const removeNextKey = () => {
      if (keys.length) {
         const firstKey = keys.shift();
        setSelected((prev) => {
          const newSet = new Set(prev);
          newSet.delete(firstKey);
          return newSet;
        });
      }
      setTimeout(removeNextKey, 500)
    };
    setTimeout(removeNextKey, 100)
  };

  return (
    <div className="box-wrapper">
      {arr.map((box, index) => {
        const isActive = selected.has(index.toString());
        return (
          <div
            onClick={onBoxClick}
            key={box + '_' + index}
            className={
              'box ' + (box ? 'enable' : '') + (isActive ? ' active' : '')
            }
            data-index={index}
            data-status={box ? 'enable' : 'hidden'}
          />
        );
      })}
    </div>
  );
}

export default App;
