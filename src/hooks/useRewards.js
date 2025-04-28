// src/hooks/useRewards.js

import { useState, useEffect, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMiotaRewardTransaction } from '../services/blockchainService';

const POINTS_PER_LOG = 10;
const POINTS_THRESHOLD = 100;
const MIOTA_PER_BATCH = 10;

export function useRewards() {
  const queryClient = useQueryClient();

  // 1. Load persisted points from localStorage (or default to 0)
  const [points, setPoints] = useState(() => {
    const stored = localStorage.getItem('points');               
    return stored ? Number(stored) : 0;                           
  });                                                             

  // 2. Persist points to localStorage on every change
  useEffect(() => {
    localStorage.setItem('points', String(points));              
  }, [points]);                                                   

  // 3. Mutation: batch-convert POINTS_THRESHOLD to MIOTA
  const convertMutation = useMutation({
    mutationFn: () => sendMiotaRewardTransaction(MIOTA_PER_BATCH), 
    onSuccess: () => {
      setPoints((prev) => prev - POINTS_THRESHOLD);              
      queryClient.invalidateQueries({ queryKey: ['points'] });   
    },
  });

  // 4. Earn points when a habit is logged
  const earnPoints = useCallback(() => {
    setPoints((prev) => prev + POINTS_PER_LOG);                  
    queryClient.invalidateQueries({ queryKey: ['points'] });     
  }, [queryClient]);

  // 5. Redeem points for a reward, returning success boolean
  const redeemPoints = useCallback(
    (cost) => {
      if (points >= cost) {
        setPoints((prev) => prev - cost);                        
        queryClient.invalidateQueries({ queryKey: ['points'] }); 
        return true;                                             
      }
      return false;                                               
    },
    [points, queryClient]
  );

  // 6. Trigger batch conversion if threshold reached
  const convertToMiota = useCallback(() => {
    if (points < POINTS_THRESHOLD) {
      throw new Error(`Need at least ${POINTS_THRESHOLD} points to convert`);
    }
    convertMutation.mutate();                                     
  }, [points, convertMutation]);

  return {
    points,
    earnPoints,
    redeemPoints,
    convertToMiota,
    isConverting: convertMutation.isLoading,                     
    isError: convertMutation.isError,                            
    error: convertMutation.error,                                
  };
}
