import { PlasmicCanvasHost, registerComponent } from '@plasmicapp/react-web/lib/host';

// Imports

import { Button } from "@medusajs/ui"

// Registrations

registerComponent(Button, {
    name: "Button",
    props: {

      children: 'slot',
      // Simple scalar props
      isLoading: 'boolean',
      asChild: 'boolean',
      
      // Props with enum of options
      variant: {
        type: 'choice',
        options: ['primary', 'transparent', 'secondary', 'danger'],
        default: 'primary'
      },
      size: {
        type: 'choice',
        options: ['small', 'base', 'large', 'xlarge'],
        default: 'base'
      }
    },
    
    // Specify how generated Plasmic code should import this component;
    // path is relative to srcDir
    importPath: '@medusajs/ui',
  });
  