import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PortfolioService } from '../../application/services/portfolio.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';

@ApiTags('Portfolio')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @ApiOperation({ summary: 'Get user portfolio' })
  getPortfolio(@CurrentUser() user: any) {
    return this.portfolioService.getPortfolioByUser(user.id);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get user portfolio summary' })
  getSummary(@CurrentUser() user: any) {
    return this.portfolioService.getPortfolioSummary(user.id);
  }
}
