"use client";

import { Button } from "@/components/ui/button";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import { toast } from "sonner";

export function SonnerToastExample() {
  const { success, error, loading, info, warning } = useSonnerToast();

  const handleSuccess = () => {
    success("Operation completed successfully");
  };

  const handleError = () => {
    error("Something went wrong");
  };

  const handleLoading = () => {
    loading("Please wait while we process your request");
  };

  const handleInfo = () => {
    info("This is an informational message");
  };

  const handleWarning = () => {
    warning("Please be careful with this action");
  };

  const handlePromise = async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Success!");
        } else {
          reject(new Error("Random error occurred"));
        }
      }, 2000);
    });

    const result = await toast.promise(promise, {
      loading: "Processing...",
      success: "Operation completed!",
      error: "Operation failed"
    });

    console.log("Promise result:", result);
  };

  const handleCustomToast = () => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Sonner Toast Examples</h2>
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleSuccess} variant="default">
          Show Success
        </Button>
        <Button onClick={handleError} variant="destructive">
          Show Error
        </Button>
        <Button onClick={handleLoading} variant="outline">
          Show Loading
        </Button>
        <Button onClick={handleInfo} variant="secondary">
          Show Info
        </Button>
        <Button onClick={handleWarning} variant="outline">
          Show Warning
        </Button>
        <Button onClick={handlePromise} variant="outline">
          Show Promise
        </Button>
        <Button onClick={handleCustomToast} variant="outline">
          Custom Toast
        </Button>
      </div>
    </div>
  );
} 