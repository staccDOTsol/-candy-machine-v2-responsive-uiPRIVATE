import styled from 'styled-components';
import {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import {CircularProgress} from '@material-ui/core';
import {GatewayStatus, useGateway} from '@civic/solana-gateway-react';
import { BN } from '@project-serum/anchor'

export const CTAButton = styled(Button)`
  display: block !important;
  margin: 0 auto !important;
  background-color: var(--title-text-color) !important;
  min-width: 120px !important;
  font-size: 1em !important;
`;

export const MintButton = ({
                               onMint
                           }: {
    onMint: () => Promise<void>;
}) => {
    return (
        <CTAButton
            disabled={false}
            
            onClick={async () => {
                    console.log('Minting...');
                    await onMint();
            }}
            variant="contained"
        >
                        as tribute for your team; become winner @ some tokenz
                    
        </CTAButton>
    );
};
