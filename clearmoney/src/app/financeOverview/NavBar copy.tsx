"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Learn } from "../AnimationComponents/Learn";
import House from "./NavBarIcons/House";
import Gap from "./NavBarIcons/Gap";
import Pie from "./NavBarIcons/Pie";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { IconBackground } from "@tabler/icons-react";

const components: {
  title: string;
  coming?: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Super Gap Calculator",
    href: "/SuperGap",
    description: "See how career breaks or part-time work impact your super",
    icon: <Gap></Gap>,
  },
  {
    title: "FHSS vs. Savings Calculator",
    href: "/FHSS",
    description: "Compare FHSS and a savings account for your home deposit",
    icon: <House></House>,
  },
];

export function NavigationMenuDemo() {
  const parentVariants = {
    hover: {},
  };

  const arrowVariants = {
    hover: { x: 2, scale: 1.05, IconBackground: "#F59E0B" },
  };

  const titleVariants = {
    hover: { color: "#F59E0B" },
  };

  return (
    <NavigationMenu className="flex justify-center w-full">
      <NavigationMenuList className="gap-8">
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              "text-[0.95rem] font-[500]",
            )}
          >
            <Link href="/financeOverview">View Your Fund</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-[0.95rem] font-[500]">
            Super Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent className="rounded-2xl">
            <div className="grid w-[450px] gap-x-6 p-6">
              <ul className="flex flex-col gap-2 w-full">
                {components.map((component) => (
                  <NavigationMenuLink
                    key={component.title}
                    href={component.href}
                  >
                    <motion.li
                      variants={parentVariants}
                      whileHover="hover"
                      key={component.title}
                      className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-slate-100 text-emerald-950"
                    >
                      <div className="flex items-center justify-center rounded-lg">
                        <div className="flex justify-center items-center rounded-[1.1rem] h-[4rem] w-[4rem] bg-emerald-100">
                          <div className="h-[2rem] w-[2rem]">
                            {component.icon}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col flex-1 gap-[0.3rem]">
                        <div className="flex items-center">
                          <motion.p
                            variants={titleVariants}
                            className="text-[0.95rem] font-[500] text-gray-900"
                          >
                            {component.title}
                          </motion.p>
                          <motion.div variants={arrowVariants}>
                            <ChevronRight className="ml-1 h-5 w-5 text-emerald-950 " />
                          </motion.div>
                        </div>
                        <p className="text-[0.95rem] text-gray-500">
                          {component.description}
                        </p>
                      </div>
                    </motion.li>
                  </NavigationMenuLink>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              "text-[0.95rem] font-[500]",
            )}
          >
            <Link href="/financeOverview">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/*
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-sm font-[500]">
            About
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium flex justify-center items-center">
                      <Learn></Learn>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/Superannuation" title="What is Super?">
                A simple guide to how super works.
              </ListItem>
              <ListItem
                href="/docs/installation"
                title="First Home Super Saver Scheme"
              >
                See how super can boost your first home deposit.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Super & Tax">
                Concessional vs non-concessional explained.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type ListItemProps = React.ComponentPropsWithoutRef<"a"> & {
  title: string;
  icon?: React.ReactNode; // 👈 custom prop
};

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, icon, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="flex">
              <div className="mr-3">
                <div className="flex justify-center items-center rounded-full h-12 w-12 bg-[RGB(235,247,248)]">
                  {icon}
                </div>
              </div>
              <div className="flex-col">
                <div className="text-[0.95rem] font-[500] leading-none">
                  {title}
                </div>
                <p className="mt-1 line-clamp-2 text-[0.8rem] leading-snug text-muted-foreground">
                  {children}
                </p>
              </div>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
