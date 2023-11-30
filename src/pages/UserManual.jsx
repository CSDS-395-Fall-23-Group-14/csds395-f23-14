import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Navbar from '../components/navbar/NavBar';


function UserManual() {
  const [modals, setModals] = React.useState(Array.from({ length: 3 }, () => false));

  const handleOpen = (index) => {
    const newModals = [...modals];
    newModals[index] = true;
    setModals(newModals);
  };

  const handleClose = (index) => {
    const newModals = [...modals];
    newModals[index] = false;
    setModals(newModals);
  };

  const modalContent = [
    {
      title: 'Stocks',
      description: 'Shares of stock represent units of ownership in a company. For example, owning Apple Inc. (AAPL) stock means you own a piece of Apple. Stocks are used for investing to gain a share of a company\'s profits through dividends or capital gains if the stock\'s price increases.',
    },
    {
      title: 'Options',
      description: 'Options are contracts that give the holder the right, but not the obligation, to buy (call option) or sell (put option) an underlying asset at a specified price (strike price) before a specified date (expiration date). For example, an Apple Inc. (AAPL) call option gives you the right to buy AAPL shares at the strike price. Options are used for hedging against price movements, speculating on future price directions, or generating income.',
    },
    {
      title: 'Stock Screener',
      description: 'A tool that investors use to filter stocks based on specific criteria such as market capitalization, sector, and financial metrics.\n\nDate Scrapped: The date when data was extracted from financial databases or websites. It\'s used to ensure the timeliness of the data being analyzed.\n\nTicker: The unique alphabetic name that identifies a stock. For example, \'AAPL\' for Apple Inc. It\'s used to quickly reference and trade stocks.\n\nShares Outstanding: The total number of a company\'s shares that are currently held by all its shareholders. This figure is used in calculating market capitalization and earnings per share.\n\nMarket Value: The total dollar value of a company\'s outstanding shares. It\'s calculated by multiplying the current market price of one share by the total number of outstanding shares. It reflects the company\'s total value as perceived by the stock market.\n\nAsset Class: A group of securities that exhibit similar characteristics and behave similarly in the marketplace. Examples include stocks, bonds, and real estate. Asset classes are used for constructing diversified investment portfolios.\n\nSector: A segment of the economy containing businesses that share similar characteristics. For example, the technology sector includes companies like Microsoft and Apple. Sectors are used to categorize companies in the stock market for targeted investment strategies.',
    },
  ];

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
          <Box
            sx={{ borderTop: 1, py: "1%", px: "40px" }}
          >
            {modals.map((modal, index) => (
              <div key={index}>
                <Button onClick={() => handleOpen(index)}>{modalContent[index].title}</Button>
                <Modal
                  open={modal}
                  onClose={() => handleClose(index)}
                  aria-labelledby={`modal-modal-title-${index}`}
                  aria-describedby={`modal-modal-description-${index}`}
                >
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    whiteSpace: "pre-wrap",
                  }}>
                    <Typography id={`modal-modal-title-${index}`} variant="h6" component="h2">
                      {modalContent[index].title}
                    </Typography>
                    <Typography id={`modal-modal-description-${index}`} sx={{ mt: 2 }}>
                      {modalContent[index].description}
                    </Typography>
                  </Box>
                </Modal>
              </div>
            ))}
          </Box>
        </div>
      </div>
    </>
  )
}

export default UserManual