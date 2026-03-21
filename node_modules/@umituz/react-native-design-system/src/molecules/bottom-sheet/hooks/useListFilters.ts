/**
 * useListFilters Hook
 */

import { useState, useCallback, useMemo } from 'react';
import { FilterOption } from '../types/Filter';

export interface FilterItem extends FilterOption {
    active?: boolean;
}

export interface UseListFiltersReturn<T> {
    filters: FilterItem[];
    setFilters: (filters: FilterItem[]) => void;
    activeFilters: FilterItem[];
    selectedIds: string[];
    applyFilters: (items: T[]) => T[];
    toggleFilter: (id: string) => void;
    handleFilterPress: (id: string) => void;
    clearFilters: () => void;
    handleClearFilters: () => void;
}

export interface UseListFiltersConfig<T> {
    options: FilterOption[];
    defaultFilterId?: string;
    singleSelect?: boolean;
    filterFn?: (item: T, activeFilters: FilterItem[]) => boolean;
}

// Overload 1: When config object is passed
export function useListFilters<T>(config: UseListFiltersConfig<T>): UseListFiltersReturn<T>;
// Overload 2: When initial filters array and optional filterFn are passed
export function useListFilters<T>(initialFilters: FilterItem[], filterFn?: (item: T, activeFilters: FilterItem[]) => boolean): UseListFiltersReturn<T>;
// Unified implementation
export function useListFilters<T>(
    configOrFilters: FilterItem[] | UseListFiltersConfig<T>,
    filterFnParam?: (item: T, activeFilters: FilterItem[]) => boolean
): UseListFiltersReturn<T> {
    const isConfig = !Array.isArray(configOrFilters);

    // Normalize initial state
    const initialFilters = isConfig
        ? (configOrFilters as UseListFiltersConfig<T>).options.map(opt => ({
            ...opt,
            active: (configOrFilters as UseListFiltersConfig<T>).defaultFilterId
                ? opt.id === (configOrFilters as UseListFiltersConfig<T>).defaultFilterId
                : false
        }))
        : (configOrFilters as FilterItem[]);

    const filterFn = isConfig
        ? (configOrFilters as UseListFiltersConfig<T>).filterFn
        : filterFnParam;

    const singleSelect = isConfig
        ? (configOrFilters as UseListFiltersConfig<T>).singleSelect
        : false;

    const [filters, setFilters] = useState<FilterItem[]>(initialFilters);

    const activeFilters = useMemo(() => filters.filter((f) => f.active), [filters]);

    const toggleFilter = useCallback((id: string) => {
        setFilters((current) => {
            if (singleSelect) {
                return current.map((f) => ({ ...f, active: f.id === id }));
            }
            return current.map((f) => (f.id === id ? { ...f, active: !f.active } : f));
        });
    }, [singleSelect]);

    const clearFilters = useCallback(() => {
        setFilters((current) => current.map((f) => ({ ...f, active: false })));
    }, []);

    const applyFilters = useCallback((items: T[]) => {
        if (activeFilters.length === 0 || !filterFn) return items;
        return items.filter((item) => filterFn(item, activeFilters));
    }, [activeFilters, filterFn]);

    const selectedIds = useMemo(() => activeFilters.map((f) => f.id), [activeFilters]);

    return {
        filters,
        setFilters,
        activeFilters,
        selectedIds,
        applyFilters,
        toggleFilter,
        handleFilterPress: toggleFilter,
        clearFilters,
        handleClearFilters: clearFilters,
    };
}
