"use client";

import { Button, Description, Field, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import animationData from "../../public/data.json"; // 保存你的 Lottie 动画数据文件
import Lottie from "lottie-web";

const extractDishes = (text: string): string[] => {
  return (text || "")
    ?.split("\n") // 将文字按行分割
    .filter((line) => line.trim() !== "" && !line.startsWith("餐厅")) // 过滤掉空行和包含“餐厅”的行
    .map((line) => line.split("\t")[0].trim());
};

export default function Home() {
  const [textareaStr, setTextareaStr] = useState("");
  const [result, setResult] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const anim = useRef<any>(null);

  useEffect(() => {
    const localStr = localStorage.getItem("textareaStr");
    if (!textareaStr && localStr) {
      setTextareaStr(localStr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    anim.current = Lottie.loadAnimation({
      container: containerRef.current,
      animationData,
      autoplay: false,
      loop: false,
    });

    return () => {
      anim.current?.destroy();
    };
  }, []);

  const onSubmit = useCallback(() => {
    //先把textareaStr存到本地localStorage
    localStorage.setItem("textareaStr", textareaStr);
    const dishes = extractDishes(textareaStr);
    if (dishes.length > 0) {
      //随机获取数组里的一项
      const randomDish = dishes[Math.floor(Math.random() * dishes.length)];
      setResult(randomDish);
      anim.current?.stop();
      anim.current?.play();
    }
  }, [textareaStr, anim]);

  return (
    <main className="select-none flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed top-0 left-0 flex h-24 w-full items-end justify-center dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <div className="text-base font-bold">
            <span className="text-base pr-2">🍔</span>今晚吃什么？
          </div>
        </div>
      </div>

      <motion.p
        key={result} // 使用result作为key，每次result变化将会强制重新渲染motion组件
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.5, 1], transition: { duration: 0.5 } }}
        exit={{ scale: 0 }}
        className={clsx("text-2xl")}
      >
        {result || "?"}
      </motion.p>
      <div
        className="absolute z-[-1] left-0 bottom-0 w-full h-full"
        ref={containerRef}
      />

      <div className="w-full max-w-md px-4 flex flex-col items-center lg:items-start">
        <Field>
          <Label className="text-sm/6 font-medium dark:text-white">内容</Label>
          <Description className="text-sm/6 text-black/50 dark:text-white/50">
            复制菜单表格内容到下面.
          </Description>
          <Textarea
            value={textareaStr}
            onChange={(e) => setTextareaStr(e.target.value)}
            className={clsx(
              "hiddenScroll w-96 mt-3 block resize-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 dark:ring-1",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            rows={3}
          />
        </Field>
        <motion.div
          className="inline-block"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          <Button
            onClick={onSubmit}
            className=" inline-flex mt-4 px-6 items-center gap-2 rounded-md bg-gray-700 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            随机 ✨
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
