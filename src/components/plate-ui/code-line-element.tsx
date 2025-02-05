'use client';

import { withRef } from '@udecode/cn';
import React from 'react';

import { PlateElement } from './plate-element';

export const CodeLineElement = withRef<typeof PlateElement>((props, ref) => (
  <PlateElement ref={ref} {...props} />
));
