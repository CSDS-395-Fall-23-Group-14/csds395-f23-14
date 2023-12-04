import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import logo from "../images/example.png";

import Navbar from '../components/NavBar/NavBar';

import { Box } from '@mui/material';

function UserManual() {
  return (
    <>
      <div className='header'>
        <Navbar />
      </div>
      <div className='body'>
        <div className="screener-wrapper">
          <Box sx={{ borderBottom: 1, px: "40px" }}>
            <h1 className="screener-h1">User Manual</h1>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container spacing={2}
              direction='row'
            >
              <Grid item xs={4} style={{ marginTop: '16px' }}>
                <Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography><b>Stocks</b></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Shares of stock represent units of ownership in a company.
                      For example, owning Apple Inc. (AAPL) stock means you own a piece of Apple.
                      Stocks are used for investing to gain a share of a company's profits through
                      dividends or capital gains if the stock's price increases.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={4} style={{ marginTop: '16px' }}>
                <Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography><b>Options</b></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Options are contracts that give the holder the right, but not the obligation,
                      to buy (call option) or sell (put option) an underlying asset at a specified
                      price (strike price) before a specified date (expiration date). For example,
                      an Apple Inc. (AAPL) call option gives you the right to buy AAPL shares at
                      the strike price. Options are used for hedging against price movements, speculating
                      on future price directions, or generating income.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={4} style={{ marginTop: '16px' }}>
                <Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography><b>Russell 3000 (Russell 3K)</b></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The Russell 3000 Index is a capitalization-weighted stock market index,
                      maintained by FTSE Russell, that seeks to be a benchmark of the entire
                      U.S stock market. It measures the performance of the 3,000 largest publicly
                      traded U.S. companies, which represent about 98% of the investable U.S. equity
                      market. This index is often used as a benchmark for broad U.S. stock market performance.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              {/*new line*/}
              <Grid item xs={4}>
                <Grid>
                  <Grid>
                    <Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography><b>Stock Screener</b></Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          A tool that investors use to filter stocks based on specific criteria such
                          as market capitalization, sector, and financial metrics.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>Date Scrapped</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          The date when data was extracted from financial databases or websites.
                          It's used to ensure the timeliness of the data being analyzed.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>Ticker</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          The unique alphabetic name that identifies a stock. For example, 'AAPL' for Apple Inc.
                          It's used to quickly reference and trade stocks.
                        </Typography>
                      </AccordionDetails>
                    </Accordion><Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>Shares Outstanding</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          The total number of a company's shares that are currently held by all its shareholders.
                          This figure is used in calculating market capitalization and earnings per share.
                        </Typography>
                      </AccordionDetails>
                    </Accordion><Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>Market Value</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          The total dollar value of a company's outstanding shares.
                          It's calculated by multiplying the current market price of one share by the total number of outstanding shares. It reflects the company's total value as perceived by the stock market.
                        </Typography>
                      </AccordionDetails>
                    </Accordion><Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>Asset Class</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          A group of securities that exhibit similar characteristics and behave similarly in the marketplace.
                          Examples include stocks, bonds, and real estate. Asset classes are used for constructing diversified investment portfolios.
                        </Typography>
                      </AccordionDetails>
                    </Accordion><Accordion disableGutters style={{ marginBottom: '16px' }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>Sector</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          A segment of the economy containing businesses that share similar characteristics.
                          For example, the technology sector includes companies like Microsoft and Apple. Sectors are used to categorize companies in the stock market for targeted investment strategies.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
                <Grid>
                  <Accordion disableGutters>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography><b>Payoff Profile</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        A graphical representation that shows the potential profit or loss of an options strategy at different prices of the underlying asset at expiration.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion disableGutters>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Spot Price</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        The spot price is the current market price at which a particular asset, such as a commodity, currency, or security, can be bought or sold for immediate delivery.
                        Unlike futures prices, which are based on expectations of future supply and demand, the spot price is based on current supply and demand.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion disableGutters>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Premium</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        In options trading, the premium is the price that the buyer of the option pays to the seller for the rights that the option grants.
                        It's determined by various factors including the underlying asset's spot price, the strike price of the option, time until expiration, volatility, and interest rates.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion disableGutters style={{ marginBottom: '16px' }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>Example</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Since we cannot know the spot price during expiration, a payoff profile shows at which price points is the hedging effective.
                      </Typography>
                      <img src={logo} style={{ marginTop: '8px' }} width={460} height={250} alt="example of Bull Spread" />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
              {/*new item ------------------------------------------------------------------------------------------------------------*/}
              <Grid item xs={4}>
                <Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography><b>Options Screener</b></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      a tool that filters options based on specific criteria such as expiration date, strike price, and volume.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>ID</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      A unique identifier for the option contract.
                      It's used to distinguish between the multitude of options available on the market.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Date Scrapped</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Similar to stocks, it's the date when options data was collected.
                      It's crucial for options as their value can change significantly in a short time.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Ticker</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The symbol representing the underlying stock of the option.
                      It's used to identify the stock on which the option contract is written.
                    </Typography>
                  </AccordionDetails>
                </Accordion><Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Ask</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The lowest price a seller is willing to accept for the option.
                      It's used by potential buyers to know the price at which they can purchase the option.
                    </Typography>
                  </AccordionDetails>
                </Accordion><Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Bid</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The highest price a buyer is willing to pay for the option.
                      It's used by potential sellers to know the price at which they can sell the option.
                    </Typography>
                  </AccordionDetails>
                </Accordion><Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Change</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The difference in the option's price from the previous day's close.
                      It's used to track the option's daily performance.
                    </Typography>
                  </AccordionDetails>
                </Accordion><Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Percent Change</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The percentage difference in the option's price from the previous day's close.
                      It's used to understand the option's performance relative to its price.
                    </Typography>
                  </AccordionDetails>
                </Accordion><Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Open Interest</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The total number of outstanding option contracts that have not been settled.
                      It's used as an indicator of the liquidity and interest in a particular option.
                    </Typography>
                  </AccordionDetails>
                </Accordion><Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Liquidity</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The ease with which an asset or security can be converted into ready cash without affecting its market price.
                      The concept is key in both the financial markets and business operations.
                    </Typography>
                  </AccordionDetails>
                </Accordion><Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Intra Day Price</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The price of the option during the trading day.
                      It's used to track the option's performance and volatility throughout the day.
                    </Typography>
                  </AccordionDetails>
                </Accordion><Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Position</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Refers to an investor's stake in an option contract.
                      It's used to describe whether the option is a call option or a put option.
                    </Typography>
                  </AccordionDetails>
                </Accordion><Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Strike</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The set price at which the option can be bought or sold if exercised.
                      It's used to determine the level at which the option becomes profitable.
                    </Typography>
                  </AccordionDetails>
                </Accordion><Accordion disableGutters>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Volume</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The number of option contracts traded in a day.
                      It's used as an indicator of the option's trading activity and liquidity.
                    </Typography>
                  </AccordionDetails>
                </Accordion><Accordion disableGutters style={{ marginBottom: '16px' }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Expiration</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      The date on which the option contract becomes void.
                      It's used to determine the time frame for the option's potential exercise.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={4}>
                <Grid>
                  <Accordion disableGutters>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography><b>Valuation</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        The process of determining the current worth of an asset or a company.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion disableGutters>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>DCF Analysis</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Discounted Cash Flow (DCF) analysis is a valuation method used to estimate the value of an investment based on its expected future cash flows.
                        For example, valuing a company by projecting its future cash flows and discounting them back to present value.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion disableGutters style={{ marginBottom: '16px' }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>LBO Analysis</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Leveraged Buyout (LBO) analysis is used to determine the value of a company in the context of an acquisition financed significantly with debt.
                        It involves assessing the company's ability to repay debt with its future cash flows.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Grid>
                    <Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography><b>Hedging Strategies</b></Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Hedging is an investment strategy used to reduce the risk of adverse price movements in an asset.
                          For example, owning a stock and buying a put option on the same stock can act as a hedge against a decline in the stock price.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Bull Spread</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          An options strategy that involves buying and selling two options with different strike prices but the same expiration date.
                          It's used when an investor expects a moderate increase in the price of the underlying asset.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Bear Spread</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Similar to a bull spread, but used when an investor expects a moderate decrease in the price of the underlying asset.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Risk Reversal</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          A strategy that involves buying a call option and selling a put option, or vice versa.
                          It's used to hedge against directional risk in the price of the underlying asset.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Butterfly</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          An options strategy combining bull and bear spreads with three different strike prices.
                          It's used to profit from the underlying asset's price moving to a specific price point.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Straddle</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          An options strategy where the investor holds a position in both a call and a put with the same strike price and expiration date.
                          It's used when an investor expects a significant price movement but is unsure of the direction.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Strip</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Used when an investor anticipates high volatility with a bearish market outlook.
                          It involves purchasing one at-the-money call option and two at-the-money put options on the same underlying asset with identical expiration dates.
                          This approach allows the investor to profit significantly if the asset's price decreases sharply, while still offering some profit potential if the price increases unexpectedly.
                          The investor's risk is limited to the total premiums paid for these options.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Strap</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          another volatility-focused options trading method, but with a bullish bias.
                          In this approach, the investor buys two at-the-money call options and one at-the-money put option on the same underlying asset, all with the same expiration date.
                          This setup positions the investor to gain substantially if the asset's price increases significantly, with the potential for moderate gains if the price falls.
                          Like the strip strategy, the risk is confined to the total premiums paid for the options.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters style={{ marginBottom: '16px' }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>Strangle</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          Similar to a straddle, but the call and put have different strike prices.
                          It's used when an investor expects a significant price movement but wants to reduce the cost of the position.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Card style={{ textAlign: 'right', margin: '0px 10px 10px 10px' }} variant="outlined">Designed By: Jin Kim | Soren Schultz | Vivian Luu | Callie Wells | Frankie Nyaga | Hiep Nguyen</Card>
          </Box>
        </div>
      </div>
    </>
  )
}

export default UserManual