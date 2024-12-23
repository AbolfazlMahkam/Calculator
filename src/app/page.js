'use client'
// import Image from "next/image";
import React from "react";

export default function Home() {
  const [display, setDisplay] = React.useState("");
  const [expression, setExpression] = React.useState([]);

  const handleClick = value => {
    setDisplay(value);
    setExpression([...expression, value]);
  };

  const handleResult = () => {
    const result = expression
      .join("")
      .split(/(\D)/g)
      .map((value) => (value.match(/\d/g) ? parseInt(value, 0) : value))
      .reduce((acc, value, index, array) => {
        switch (value) {
          case "+":
            return (acc = acc + array[index + 1]);
          case "-":
            return (acc = acc - array[index + 1]);
          case "x":
            return (acc = acc * array[index + 1]);
          case "÷":
            return (acc = acc / array[index + 1]);
          default:
            return acc;
        }
      });
    setDisplay(result);
    setExpression("");
  };

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      if (!isNaN(key)) {
        handleClick(Number(key));
      } else if (["+", "-", "/", "*"].includes(key)) {
        const operatorMap = { "/": "÷", "*": "x" };
        handleClick(operatorMap[key] || key);
      } else if (key === "Enter") {
        handleResult();
      } else if (key === "Backspace") {
        setExpression(expression.slice(0, -1));
        setDisplay(expression.slice(0, -1).join(""));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [expression]);

  return (
    <div id="calculator" className="flex justify-center items-center h-dvh">
      <div className="text-center">
        <h3 className="bg-slate-300 text-slate-900 font-bold min-h-8 m-auto mt-2 max-w-[245px] py-2 px-3 rounded-xl">{display}</h3>
        <p className="bg-slate-400 text-slate-900 min-h-8 m-auto mt-2 max-w-[245px] py-1 px-2 rounded-xl">{expression}</p>

        <section className="flex justify-center items-center pt-2">
          <section>
            <section className="grid grid-cols-3 gap-2">
              {
                [7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    className="w-14 h-14 bg-slate-800 rounded-full"
                    onClick={() => handleClick(num)}
                  >
                    {num}
                  </button>
                ))
              }
            </section>

            <section>
              <button
                className="w-[182px] h-14 bg-slate-800 rounded-full mt-2"
                onClick={() => handleClick(0)}
              >
                0
              </button>
            </section>
          </section>

          <section className="grid grid-cols-1 gap-2 pl-2">
            {
              ["÷", "x", "-", "+"].map((op) => (
                <button
                  key={op}
                  className="w-14 h-[42px] bg-orange-600 rounded-full"
                  onClick={() => handleClick(op)}
                >
                  {op}
                </button>
              ))
            }
            <button className="w-14 h-[42px] bg-orange-600 rounded-full" onClick={() => handleResult()}>=</button>
          </section>
        </section>
      </div>
    </div>
  )
}
