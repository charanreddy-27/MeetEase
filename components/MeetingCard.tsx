"use client";

import Link from "next/link";
import { Share2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface MeetingCardProps {
  id: string;
  title: string;
  date: string;
  time?: string;
  duration?: number;
  participants?: number;
  isUpcoming?: boolean;
  isPrevious?: boolean;
}

const MeetingCard = ({
  id,
  title,
  date,
  time,
  duration,
  participants,
  isUpcoming = false,
  isPrevious = false,
}: MeetingCardProps) => {
  const { toast } = useToast();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL || "https://meetease.com"}/meeting/${id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    toast({
      title: "Link Copied",
      description: "Meeting link copied to clipboard",
    });
  };

  return (
    <div className="group rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary-500/40 hover:shadow-glow">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold">{title}</h3>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <span>{date}</span>
            {time && (
              <>
                <span className="size-1 rounded-full bg-secondary-500" />
                <span>{time}</span>
              </>
            )}
            {duration && (
              <>
                <span className="size-1 rounded-full bg-secondary-500" />
                <span>{duration} min</span>
              </>
            )}
          </div>
        </div>
        <span className="rounded-full bg-primary-500/15 px-2.5 py-1 text-xs font-medium text-primary-400">
          {isUpcoming ? "Upcoming" : isPrevious ? "Previous" : "Meeting"}
        </span>
      </div>

      {participants && (
        <div className="mb-4 flex items-center gap-2">
          <div className="flex -space-x-2">
            {[...Array(Math.min(participants, 3))].map((_, i) => (
              <div
                key={i}
                className="flex size-8 items-center justify-center rounded-full border-2 border-card bg-secondary-700 text-xs"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            {participants > 3 && (
              <div className="flex size-8 items-center justify-center rounded-full border-2 border-card bg-secondary-800 text-xs">
                +{participants - 3}
              </div>
            )}
          </div>
          <span className="text-sm text-muted-foreground">{participants} participants</span>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {isUpcoming && (
          <Link
            href={`/meeting/${id}`}
            className="flex-1 rounded-xl bg-primary text-center text-sm font-medium text-primary-foreground transition-all hover:shadow-glow"
            style={{ padding: "0.5rem 0.75rem" }}
          >
            Join Meeting
          </Link>
        )}

        {isPrevious && (
          <Link
            href={`/recordings/${id}`}
            className="flex-1 rounded-xl bg-secondary-800 px-3 py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary-700"
          >
            View Recording
          </Link>
        )}

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 rounded-xl bg-secondary-800 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary-700"
        >
          <Share2 className="size-4" />
          Share
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;
