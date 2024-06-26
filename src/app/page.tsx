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
    .map((line) => line.split("\t")[0].trim()); // 提取菜品名称
};

export default function Home() {
  const [textareaStr, setTextareaStr] = useState("");
  const [result, setResult] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const anim = useRef<any>(null);

  useEffect(() => {
    const localStr = localStorage.getItem("textareaStr");
    if (!textareaStr) {
      setTextareaStr(localStr || defaultStr);
    }
  }, [textareaStr]);

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

const defaultStr = `八宝粥	0	11.00	0	订餐
酱肉葱香肠粉	1	14.00	0	订餐
鲜滑肉片肠粉	0	14.00	0	订餐
肉末鸡蛋肠粉	0	14.00	0	订餐
皮蛋瘦肉粥	0	14.00	0	订餐
瘦肉蔬菜粥	0	14.00	0	订餐
鲜虾肠粉	0	17.00	0	订餐
生滚鱼片粥	0	17.00	0	订餐
艇仔粥	0	17.00	0	订餐
牛肉滑蛋粥	0	18.00	0	订餐
牛肉番茄芹菜肠粉	1	19.00	0	订餐
潮式牛肉鸡蛋肠粉	2	19.00	0	订餐
蛋炒河粉	0	19.00	0	订餐
霸气叉烧香菜肠粉	0	19.90	0	订餐
虾仁鱼片粥	0	22.00	2.00	订餐
香菇滑鸡饭	1	24.00	4.00	订餐
潮式牛肉鲜虾肠粉	0	24.00	4.00	订餐
一碗香肉片盖饭	0	24.00	4.00	订餐
一碗香牛肉盖饭	3	24.00	4.00	取消
干炒牛河	2	26.00	6.00	订餐
金汤酸菜鱼饭	1	27.00	7.00	订餐
香菇排骨饭	0	27.00	7.00	订餐
牛肉番茄鸡蛋饭	0	27.00	7.00	订餐
叉烧滑蛋饭	0	29.00	9.00	订餐
牛腩萝卜饭	0	29.00	9.00	订餐
牛肉滑蛋饭	0	29.00	9.00	订餐
牛腩滑蛋饭	1	29.00	9.00	订餐
牛腩捞河粉	0	29.00	9.00	订餐
餐厅： 老乡鸡
花卷（2个）	0	4.00	0	订餐
粗粮盒（红薯、南瓜、玉米）	0	6.00	0	订餐
粗粮盒+花卷	0	8.00	0	订餐
小米南瓜粥+松糕	0	9.00	0	订餐
小米南瓜粥+卤肉肠	0	10.00	0	订餐
粗粮盒+卤鸡腿	0	12.00	0	订餐
花卷+小炒花菜	0	12.00	0	订餐
小米南瓜粥+松糕+卤翅根	0	12.50	0	订餐
小米南瓜粥+蒸蛋	0	13.00	0	订餐
小米南瓜粥+松糕+卤肉肠	0	14.00	0	订餐
松糕（2个）+鸡腿	0	14.00	0	订餐
西红柿炒鸡蛋+卤鸡腿	0	15.00	0	订餐
粗粮盒+西红柿炒鸡蛋	0	15.00	0	订餐
卤鸡腿（2个）+松糕	0	16.00	0	订餐
西红柿炒鸡蛋+土豆片	0	16.00	0	订餐
粗粮盒+小炒花菜	0	16.00	0	订餐
卤鸡腿+蒜蓉娃娃菜	0	16.00	0	订餐
粗粮盒+蒜蓉娃娃菜	0	16.00	0	订餐
小米南瓜粥+卤鸡腿（2个）	0	17.00	0	订餐
粗粮盒+鱼香肉丝	0	17.00	0	订餐
小米南瓜粥+西红柿炒鸡蛋+卤翅根	0	17.50	0	订餐
西红柿炒蛋+卤鸡腿+米饭	0	18.00	0	订餐
蒸蛋+蒜蓉娃娃菜	0	18.00	0	订餐
鸡汤馄饨	0	18.00	0	订餐
西红柿炒鸡蛋+土豆片+米饭	0	19.00	0	订餐
红烧茄子+土豆片+米饭	1	19.00	0	订餐
花卷（2个）+菠萝咕咾肉	0	19.00	0	订餐
卤鸡腿+小炒花菜+米饭	0	19.00	0	订餐
小米南瓜粥+西红柿炒鸡蛋+卤鸡腿	0	20.00	0	订餐
卤鸡腿（2个）+蒸蛋	1	20.00	0	订餐
西红柿炒鸡蛋+土豆片+黑米饭	0	21.00	1.00	订餐
西红柿炒鸡蛋+红烧茄子+米饭	0	21.00	1.00	订餐
粗粮盒+老母鸡汤	0	22.00	2.00	订餐
粗粮盒+卤鸡腿+小炒花菜	0	22.00	2.00	订餐
番茄炒蛋+小炒花菜+米饭	0	22.00	2.00	订餐
小炒花菜+红烧茄子+米饭	0	22.00	2.00	订餐
西红柿炒鸡蛋+红烧茄子+黑米饭	0	23.00	3.00	订餐
卤鸡腿（2个）+蒸蛋+花卷（2个）	0	24.00	4.00	订餐
松糕（2个）+小炒花菜+蒸蛋	0	26.00	6.00	订餐
红烧茄子+农家小炒肉+米饭	0	27.00	7.00	订餐
菠萝咕咾肉+红烧茄子+米饭	0	27.00	7.00	订餐
花卷（2个）+小炒花菜+蒸蛋+鸡腿	0	28.00	8.00	订餐
小炒花菜+农家小炒肉+米饭	0	28.00	8.00	订餐
金汤酸菜鱼+鸡腿+黑米饭	0	29.00	9.00	订餐
土豆片+葱油鸡+米饭	0	29.00	9.00	订餐
蒸蛋+小炒花菜+卤肉肠+卤鸡腿	0	29.00	9.00	订餐
金汤酸菜鱼+土豆片+黑米饭	0	30.00	10.00	订餐
金汤酸菜鱼+红烧茄子+米饭	0	30.00	10.00	订餐`;
