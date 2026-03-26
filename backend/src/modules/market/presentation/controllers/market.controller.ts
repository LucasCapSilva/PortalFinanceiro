import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MarketService } from '../../application/services/market.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { format, subHours, subDays } from 'date-fns';

@ApiTags('Market')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('stocks')
  @ApiOperation({ summary: 'Get all stocks' })
  getStocks() {
    return this.marketService.getStocks();
  }

  @Get('stocks/:symbol')
  @ApiOperation({ summary: 'Get stock by symbol' })
  getStock(@Param('symbol') symbol: string) {
    return this.marketService.getStockBySymbol(symbol);
  }

  @Get('indices')
  @ApiOperation({ summary: 'Get all market indices' })
  getIndices() {
    return this.marketService.getIndices();
  }

  @Get('chart/:symbol/:range')
  @ApiOperation({ summary: 'Get chart data for symbol' })
  getChartData(@Param('symbol') symbol: string, @Param('range') range: string) {
    // Generate mock chart data as requested by the frontend
    const points = range === '1D' ? 24 : range === '1W' ? 7 : range === '1M' ? 30 : range === '3M' ? 90 : range === '1Y' ? 12 : 50;
    const baseValue = 100; // In a real scenario, use actual base value
    const data = [];
    let currentValue = baseValue;

    for (let i = 0; i < points; i++) {
      const change = (Math.random() - 0.5) * (baseValue * 0.02);
      currentValue += change;
      
      let timeLabel = '';
      const now = new Date();
      
      switch (range) {
        case '1D':
          timeLabel = format(subHours(now, points - i), 'HH:mm');
          break;
        case '1W':
        case '1M':
          timeLabel = format(subDays(now, points - i), 'dd/MM');
          break;
        case '3M':
        case '1Y':
          timeLabel = format(subDays(now, (points - i) * 30), 'MMM yy');
          break;
        default:
          timeLabel = i.toString();
      }

      data.push({
        time: timeLabel,
        value: Number(currentValue.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000)
      });
    }
    return data;
  }
}
