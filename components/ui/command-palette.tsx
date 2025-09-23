"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Home, Users, Calendar, MapPin, CreditCard, Settings, User } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const router = useRouter();

  const commands = [
    {
      group: "Navigation",
      items: [
        { icon: Home, label: "Home", value: "home", action: () => router.push("/") },
        { icon: MapPin, label: "Find Spaces", value: "spaces", action: () => router.push("/spaces") },
        { icon: Calendar, label: "Events", value: "events", action: () => router.push("/events") },
        { icon: CreditCard, label: "Plans", value: "plans", action: () => router.push("/plans") },
        { icon: Users, label: "About", value: "about", action: () => router.push("/about") },
      ],
    },
    {
      group: "Account",
      items: [
        { icon: User, label: "Dashboard", value: "dashboard", action: () => router.push("/dashboard") },
        { icon: Settings, label: "Settings", value: "settings", action: () => router.push("/settings") },
        { icon: CreditCard, label: "Billing", value: "billing", action: () => router.push("/billing") },
      ],
    },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {commands.map((group) => (
          <CommandGroup key={group.group} heading={group.group}>
            {group.items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={() => runCommand(item.action)}
                className="flex items-center space-x-2"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}