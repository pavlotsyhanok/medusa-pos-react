import * as React from 'react';
import { PlasmicCanvasHost, registerComponent } from '@plasmicapp/react-web/lib/host';

// Medusa UI Imports

import './medusa-ui-imports-plasmic';

export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}
