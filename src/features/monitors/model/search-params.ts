import { parseAsInteger, parseAsString, parseAsStringLiteral } from "nuqs";
import { STATUS_TABS } from "./filters";

export const monitorListParsers = {
    status: parseAsStringLiteral(STATUS_TABS).withDefault("all"),
    q: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1)
};
