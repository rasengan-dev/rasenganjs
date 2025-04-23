import { useState } from 'react';
import Button from './button';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import { CircleCheckBig, Copy } from 'lucide-react';

export default function CopyButton({
  text,
  textToDisplay,
  className,
}: {
  text: string;
  textToDisplay?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={twMerge(
        'relative overflow-hidden transition-all duration-300',
        className,
        copied ? 'border-green-500 text-green-500' : 'text-foreground'
      )}
      onClick={copyToClipboard}
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{
          y: copied ? -100 : isHover ? -100 : 0,
        }}
      >
        {textToDisplay ?? text}
      </motion.div>
      <motion.div
        initial={{ y: 100 }}
        animate={{
          y: copied ? 0 : isHover ? 0 : 100,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {copied ? (
          <div className="flex gap-2 items-center transition-all">
            <CircleCheckBig className={twMerge('w-5 h-5')} />
            <span>text copied</span>
          </div>
        ) : (
          <div className="flex gap-2 items-center transition-all">
            <Copy className="w-5 h-5" />
            <span>click to copy</span>
          </div>
        )}
      </motion.div>
    </Button>
  );
}
