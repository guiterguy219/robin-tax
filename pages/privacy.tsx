import React, { Fragment, useState } from 'react';
import { AppBar, Button, DialogTitle, makeStyles, Toolbar, Typography, DialogContent, DialogContentText } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    spacer: {
      flexGrow: 1,
    }
  }));

const Privacy = () => {
    const classes = useStyles();

    return (
        <Fragment>
            <DialogTitle>
                Data and Privacy
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Robintax is a free, open-source, software which gathers user's Robinhood information for purposes of showing tax implications in the current year.
                    Robintax does not create any information about your activity nor do we store any information you provide. Robintax does not store any information displayed. 
                    Robintax uses your Robinhood account information by credentials you provide to gather all required account information. As such, Identity Verification such 
                    as MFA, SSMS and E-mail codes will be required to login to Robintax. For security reasons, Robintax does not allow caching or saving passwords on the platform 
                    and therefore will require users to use Robinhood's two-factor authentication each time you login. Additionally, Robintax does not automatically refresh 
                    account information. All codes will be provided by Robinhood itself. Robintax does not act as a tax-advisory and should not be used as official tax documentation. 
                    If questions arise regarding your taxes surrounding your Robinhood account, consult a Tax professional. Robintax's goal is to educate retail investors on tax 
                    implications that trades may have during a given year to help other's find insights into strategic account planning or warning signs.
                </DialogContentText>
            </DialogContent>
        </Fragment>
    )
}

export default Privacy