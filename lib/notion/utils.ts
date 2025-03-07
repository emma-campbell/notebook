import { DateTime } from "luxon";
export const getStringProperty = (item: any, key: string) => {
    if (!item?.properties || !key) {
        return null;
    }

    const value = item.properties[key];
    if (!value) {
        return null;
    }

    switch (value.type) {
        case "number":
            return value.number?.toString() || null;
        case "url":
            return value.url || null;
        case "select":
            return value.select?.name || null;
        case "multi_select":
            return value.multi_select?.map((opt: any) => opt.name).join(", ") || null;
        case "date":
            return value.date?.start || null;
        case "title":
            return value.title?.[0]?.plain_text || null;
        case "rich_text":
            return value.rich_text?.[0]?.plain_text || null;
        default:
            return null;
    }
};

export const getDateProperty = (item: any, key: string) => {
    if (!("properties" in item)) {
        return undefined;
    }

    const value = item?.properties[key];

    switch (value.type) {
        case "date":
            if (!value.date) return undefined;
            if (!value.date.end)
                return DateTime.fromISO(value.date.start)
                    .toJSDate();
            return [
                DateTime.fromISO(value.date.start).toJSDate(),
                DateTime.fromISO(value.date.end).toJSDate(),
            ];
        case "last_edited_time":
            return DateTime.fromISO(value.last_edited_time).toJSDate();
        case "created_time":
            return DateTime.fromISO(value.created_time).toJSDate();
        default:
            console.warn('key %s is of type "%s" instead of "date"', key, value.type);
    }
};