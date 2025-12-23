'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Child } from '@/types/child';

interface ChildContextType {
  selectedChild: Child | null;
  setSelectedChild: (child: Child | null) => void;
  children: Child[];
  setChildren: (children: Child[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchChildren: () => Promise<void>;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

const SELECTED_CHILD_KEY = 'selectedChildId';

export function ChildProvider({ children: childrenProp }: { children: ReactNode }) {
  const [selectedChild, setSelectedChildState] = useState<Child | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/children');
      const data = await response.json();

      if (response.ok) {
        const fetchedChildren = data.children || [];
        setChildren(fetchedChildren);

        // Try to restore previously selected child
        const savedChildId = localStorage.getItem(SELECTED_CHILD_KEY);
        if (savedChildId) {
          const savedChild = fetchedChildren.find((c: Child) => c.id === savedChildId);
          if (savedChild) {
            setSelectedChildState(savedChild);
          } else {
            // Child no longer exists, clear saved selection
            localStorage.removeItem(SELECTED_CHILD_KEY);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching children:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const setSelectedChild = (child: Child | null) => {
    setSelectedChildState(child);
    if (child) {
      localStorage.setItem(SELECTED_CHILD_KEY, child.id);
    } else {
      localStorage.removeItem(SELECTED_CHILD_KEY);
    }
  };

  return (
    <ChildContext.Provider
      value={{
        selectedChild,
        setSelectedChild,
        children,
        setChildren,
        loading,
        setLoading,
        fetchChildren,
      }}
    >
      {childrenProp}
    </ChildContext.Provider>
  );
}

export function useChildContext() {
  const context = useContext(ChildContext);
  if (context === undefined) {
    throw new Error('useChildContext must be used within a ChildProvider');
  }
  return context;
}


