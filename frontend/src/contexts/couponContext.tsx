import React, { createContext, useState, useCallback, useEffect } from 'react';
import couponService from '../services/couponService';

export interface ICouponCode {
  id: string;
  code: string;
  isPercent: boolean;
  isAmount: boolean;
  discountMount: number;
  expireDate: Date;
  isActive: boolean;
  createdAt: Date;
  pending?: boolean;
}

export interface ICouponCodeState {
  codes: ICouponCode[];
  isLoading?: boolean;
  hasFailed?: boolean;
  hasSubmitted?: boolean;
  errorMessage?: string;
}

interface ICouponContext extends ICouponCodeState {
  resetState: React.DispatchWithoutAction;
  setState: (obj: any) => void;
  setCodePending: (codeId: string, val: boolean) => void;
}

export const initialState = {
  codes: [],
  isLoading: false,
  hasFailed: false,
  hasSubmitted: false,
  errorMessage: ''
};

const CouponContext = createContext<ICouponContext | undefined>(undefined);

export function CouponProvider(props: any) {
  const [state, setState] = useState<ICouponCodeState>(initialState);

  const setCodePending = (codeId: string, val: boolean) => {
    const foundCode = state.codes.find((code: ICouponCode) => code.id === codeId);
    if (foundCode) {
      foundCode.pending = val;
      const targetCodeIndex = state.codes
        .map((code: ICouponCode) => code.id)
        .indexOf(codeId);
      const newCodes = state.codes;
      newCodes.splice(targetCodeIndex, 1, foundCode);
      setState((prevState) => ({
        ...prevState,
        codes: newCodes
      }));
    }
  };

  const fetchData = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true
    }));
    try {
      const data: any[] = await couponService.fetchExistingCoupons();
      if (data && data.length) {
        setState((prevState) => ({
          ...prevState,
          codes: data.map((el: any) => ({
            ...el, pending: false
          })),
          isLoading: false,
          hasFailed: false,
          hasSubmitted: true
        }));
      }
    } catch (error) {
      console.error(error);
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        hasFailed: true,
        hasSubmitted: false
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const resetState = useCallback(
    () => {
      setState(initialState);
    }, []
  );

  return (
    <CouponContext.Provider
      value={{
        ...state,
        resetState,
        setState,
        setCodePending
      }}
    >
      {props.children}
    </CouponContext.Provider>
  );
}

export function useCoupon() {
  const context = React.useContext(CouponContext);
  if (context === undefined) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }
  return context;
}
