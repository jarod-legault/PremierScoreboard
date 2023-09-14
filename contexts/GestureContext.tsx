import * as React from 'react';
import {useRef} from 'react';

type GestureProviderProps = {children: React.ReactNode};
type ShapeCoordinates = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};
type Value = {
  getHomeNameCoordinates: () => ShapeCoordinates;
  setHomeNameCoordinates: (newCoordinates: ShapeCoordinates) => void;
  getVisitorNameCoordinates: () => ShapeCoordinates;
  setVisitorNameCoordinates: (newCoordinates: ShapeCoordinates) => void;
};

const DEFAULT_COORDINATES: ShapeCoordinates = {x1: 0, x2: 0, y1: 0, y2: 0};

const GestureContext = React.createContext<Value | undefined>(undefined);

function GestureProvider({children}: GestureProviderProps) {
  const homeNameCoordinatesRef = useRef(DEFAULT_COORDINATES);
  const setHomeNameCoordinates = (newCoordinates: ShapeCoordinates) =>
    (homeNameCoordinatesRef.current = newCoordinates);
  const getHomeNameCoordinates = () => homeNameCoordinatesRef.current;
  const visitorNameCoordinatesRef = useRef(DEFAULT_COORDINATES);
  const setVisitorNameCoordinates = (newCoordinates: ShapeCoordinates) =>
    (visitorNameCoordinatesRef.current = newCoordinates);
  const getVisitorNameCoordinates = () => visitorNameCoordinatesRef.current;

  const value: Value = {
    getHomeNameCoordinates,
    setHomeNameCoordinates,
    getVisitorNameCoordinates,
    setVisitorNameCoordinates,
  };

  return (
    <GestureContext.Provider value={value}>{children}</GestureContext.Provider>
  );
}

function useGestureContext() {
  const context = React.useContext(GestureContext);
  if (context === undefined) {
    throw new Error('useGestureContext must be used within a GestureProvider');
  }
  return context;
}

export {GestureProvider, useGestureContext};
