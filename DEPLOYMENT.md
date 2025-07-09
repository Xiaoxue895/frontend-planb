# Vercel Deployment Instructions

## Required Vercel Settings

### 1. Project Framework
- **Framework Preset**: `Other` or `Vite` (NOT React Native)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2. Node.js Version
- **Node.js Version**: `18.x` or higher
- This is specified in `.nvmrc` and `package.json` engines field

### 3. Environment Variables (if needed)
- `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `VITE_API_BASE_URL`: Your backend API URL
- `VITE_NODE_ENV`: `production`

### 4. Build Configuration
- The project uses Vite as the build tool
- TypeScript compilation is included in the build process
- Output directory is `dist/`

## Troubleshooting

### Common Issues:
1. **Exit Code 126**: Usually means wrong framework setting or Node version
2. **TypeScript Errors**: Run `npm run type-check` locally first
3. **Build Failures**: Check if all dependencies are properly installed

### Build Commands Available:
- `npm run build`: Full build with TypeScript checking
- `npm run build:only`: Vite build without TypeScript checking
- `npm run type-check`: TypeScript checking only

## Manual Deployment Steps

1. Go to Vercel Dashboard
2. Import your GitHub repository
3. Set Framework Preset to "Other" or "Vite"
4. Set Build Command to `npm run build`
5. Set Output Directory to `dist`
6. Set Node.js Version to 18.x in Settings > Functions
7. Add required environment variables
8. Deploy 