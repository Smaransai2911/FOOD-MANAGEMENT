import { format } from "date-fns";
import { Package2, Calendar } from "lucide-react";
import { Donation } from "@shared/schema";

interface DonationItemProps {
  donation: Donation;
  onClick?: (donation: Donation) => void;
}

export function DonationItem({ donation, onClick }: DonationItemProps) {
  // Map status to appropriate classes
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-purple-100 text-purple-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  return (
    <div
      className="px-4 py-4 sm:px-6 hover:bg-neutral-50 cursor-pointer"
      onClick={() => onClick && onClick(donation)}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-primary-700 truncate">
          {/* This would normally show recipient name, but we'll use ID for now */}
          {donation.recipientId ? `Recipient #${donation.recipientId}` : "Unassigned"}
        </p>
        <div className="ml-2 flex-shrink-0 flex">
          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(donation.status)}`}>
            {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
          </p>
        </div>
      </div>
      <div className="mt-2 sm:flex sm:justify-between">
        <div className="sm:flex">
          <p className="flex items-center text-sm text-neutral-500">
            <Package2 className="flex-shrink-0 mr-1.5 h-5 w-5 text-neutral-400" />
            {donation.notes || "Food donation"}
          </p>
        </div>
        <div className="mt-2 flex items-center text-sm text-neutral-500 sm:mt-0">
          <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-neutral-400" />
          <p>
            {donation.pickupDate
              ? format(new Date(donation.pickupDate), "MMM dd, yyyy")
              : format(new Date(donation.createdAt), "MMM dd, yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
}
