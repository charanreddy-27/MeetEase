"use client";
import { ReactNode } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  instantMeeting?: boolean;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  instantMeeting,
  image,
  buttonClassName,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-7 px-7 py-10">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary-500/20 blur-xl"></div>
                <Image
                  src={image}
                  alt="checked"
                  width={80}
                  height={80}
                  className="relative z-10 animate-slide-up"
                />
              </div>
            </div>
          )}
          <h1
            className={cn(
              "font-heading text-3xl font-bold leading-[42px] animate-fade",
              className,
            )}
          >
            {title}
          </h1>
          <div className="animate-slide-up">{children}</div>
          <Button
            variant="gradient"
            className={cn(
              "rounded-xl py-6 text-base font-medium transition-all duration-300 hover:translate-y-[-2px]",
              buttonClassName,
            )}
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={16}
                height={16}
                className="mr-2"
              />
            )}
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
