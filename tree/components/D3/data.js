export default {
  nodes: [
    { 
      id: 0,
      group: 0, 
      title: 'Sit amet mauris commodo quis imperdiet eiusmod tempor incididunt', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageSrc: '/placeholder.png',
      x: 200,
      y: 100,
    },
    { 
      id: 1,
      group: 1, 
      title: 'Sem fringilla ut morbi tincidunt augue interdum. Blandit libero volutpat sed cras ornare arcu', 
      description: 'Orci ac auctor augue mauris augue neque gravida in. Non nisi est sit amet facilisis. Purus non enim praesent elementum facilisis.',
      imageSrc: '/placeholder.png',
      x: 900,
      y: 200,
    },
  ],
  links: [
    { id: 0, source: 0, target: 1 },
  ]
};