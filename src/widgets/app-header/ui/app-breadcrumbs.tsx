"use client";

import { buildBreadcrumbs } from "@/shared/lib/breadcrumbs";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/shared/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function AppBreadcrumbs() {
    const crumbs = buildBreadcrumbs(usePathname());

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;
                    return (
                        <Fragment key={`${index}-${crumb.label}`}>
                            <BreadcrumbItem>
                                {isLast || !crumb.href ? (
                                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink render={<Link href={crumb.href} />}>
                                        {crumb.label}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
