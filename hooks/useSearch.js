import { useMemo, useState } from "react";

const useSearch = (data = [], fields = []) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return data;
        }

        return data.filter((item) =>
            fields.some((field) => {
                const value = item?.[field];

                if (value === null || value === undefined) {
                    return false;
                }

                return String(value)
                    .toLowerCase()
                    .includes(query);
            })
        );
    }, [data, searchQuery, fields]);

    return {
        searchQuery,
        setSearchQuery,
        filteredData,
    };
};

export default useSearch;