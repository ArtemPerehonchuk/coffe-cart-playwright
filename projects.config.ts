import { devices } from '@playwright/test';


const  projects = [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: false,
       },
    },
  ]

  export default projects