
import { createCanvas, loadImage, registerFont, CanvasRenderingContext2D, Image } from 'canvas';
import fs from 'fs';

export async function generateDarkBackround(): Promise<Buffer> {
   
    const backgroundImage = await loadImage(__dirname + '/../assets/img/dark.png');
    const width = backgroundImage.width;
    const height = backgroundImage.height;

  
    const canvas = createCanvas(width, height);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    ctx.drawImage(backgroundImage, 0, 0, width, height);

  
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.moveTo(22, 0);
    ctx.lineTo(width - 22, 0);
    ctx.quadraticCurveTo(width, 0, width, 22);
    ctx.lineTo(width, height - 22);
    ctx.quadraticCurveTo(width, height, width - 22, height);
    ctx.lineTo(22, height);
    ctx.quadraticCurveTo(0, height, 0, height - 22);
    ctx.lineTo(0, 22);
    ctx.quadraticCurveTo(0, 0, 22, 0);
    ctx.closePath();
    ctx.fill();

  
    const rankCardBuffer = canvas.toBuffer("image/png");
    return rankCardBuffer;
}

export async function addServerLogo(background: Buffer, serverLogo: Buffer): Promise<Buffer> {
      
      const backgroundImage = await loadImage(background);
      const serverLogoImage = await loadImage(serverLogo);
  
      const width = backgroundImage.width;
      const height = backgroundImage.height;
  
      
      const canvas = createCanvas(width, height);
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

      ctx.drawImage(backgroundImage, 0, 0, width, height);
  
    
      const logoX = 25;
      const logoY = (height - serverLogoImage.height) / 2;
  
      ctx.drawImage(serverLogoImage, logoX, logoY);
    const resultBuffer = canvas.toBuffer("image/png");
   
    return resultBuffer;
}


export async function resizeAndRoundImage(url: string): Promise<Buffer> {
    const imageSize = 150; 
    const padding = 5; 
    const canvasSize = imageSize + 2 * padding; 

    const canvas = createCanvas(canvasSize, canvasSize);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    
    const response = await fetch(url);
    const imageBuffer = await response.arrayBuffer();
    const imageUint8Array = new Uint8Array(imageBuffer);
    const imageBufferNode = Buffer.from(imageUint8Array);
    const image = await loadImage(imageBufferNode);

    
    const tempCanvas = createCanvas(imageSize, imageSize);
    const tempCtx: CanvasRenderingContext2D = tempCanvas.getContext('2d');

    
    tempCtx.drawImage(image, 0, 0, imageSize, imageSize);



    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    const radius = imageSize / 2 + padding;

    ctx.fillStyle = 'transparent';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    
    ctx.drawImage(tempCanvas, padding, padding, imageSize, imageSize);


  
    const resultBuffer = canvas.toBuffer("image/png");
    
    return resultBuffer;
}

export async function addRoundedRectangleToBuffer(buffer: Buffer, discordName: string): Promise<Buffer> {
    const transparency = 0.55;
    const yOffset = 25;
    const rectangleHeight = 200;
    const borderRadius = 20; 
    const text =  centerText(`Nouveau serveur\n\n\n${discordName}`);

    
    const image = new Image();
    image.src = buffer;

    const width = image.width;
    const height = image.height;

    const extendedWidth = width;

    const canvas = createCanvas(extendedWidth, height);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0);

    ctx.fillStyle = `rgba(0, 0, 0, ${transparency})`;
    ctx.beginPath();
    ctx.moveTo(200 + borderRadius, yOffset);
    ctx.lineTo(200 + 450 - borderRadius, yOffset);
    ctx.quadraticCurveTo(200 + 450, yOffset, 200 + 450, yOffset + borderRadius);
    ctx.lineTo(200 + 450, yOffset + rectangleHeight - borderRadius);
    ctx.quadraticCurveTo(200 + 450, yOffset + rectangleHeight, 200 + 450 - borderRadius, yOffset + rectangleHeight);
    ctx.lineTo(200 + borderRadius, yOffset + rectangleHeight);
    ctx.quadraticCurveTo(200, yOffset + rectangleHeight, 200, yOffset + rectangleHeight - borderRadius);
    ctx.lineTo(200, yOffset + borderRadius);
    ctx.quadraticCurveTo(200, yOffset, 200 + borderRadius, yOffset);
    ctx.closePath();
    ctx.fill();


    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';

   
    const textWidth = ctx.measureText(text).width;
    const textHeight = 20; 

    
    const textX = 200 + 450 / 2; 
    const textY = yOffset + (rectangleHeight -  textHeight -20) / 2;

    ctx.fillText(text, textX, textY);
    const resultBuffer = canvas.toBuffer("image/png");
    return resultBuffer;
}

function centerText(text: string): string {
    const lines = text.split('\n');
    const maxLength = Math.max(...lines.map(line => line.trim().length));
    const centeredLines = lines.map(line => {
      const paddingLength = Math.max(0, (maxLength - line.trim().length) / 2);
      const leftPadding = ' '.repeat(Math.floor(paddingLength));
      const rightPadding = ' '.repeat(Math.ceil(paddingLength));
      return leftPadding + line.trim() + rightPadding;
    });
    const centeredText = centeredLines.join('\n');
    return centeredText;
  }