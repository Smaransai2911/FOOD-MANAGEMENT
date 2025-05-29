import { ReactNode } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  linkTo?: string;
  linkText?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  iconBgColor = "bg-primary-50",
  iconColor = "text-primary-700",
  linkTo,
  linkText,
}: StatsCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-5">
        <div className="flex items-center">
          <div className={cn("flex-shrink-0 rounded-md p-3", iconBgColor)}>
            <div className={iconColor}>{icon}</div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-neutral-500 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-heading font-semibold text-neutral-900">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {linkTo && linkText && (
        <div className="bg-neutral-50 px-5 py-3">
          <div className="text-sm">
            <Link
              href={linkTo}
              className="font-medium text-primary-700 hover:text-primary-900"
            >
              {linkText}
            </Link>
          </div>
        </div>
      )}
    </Card>
  );
}
