import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Link,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    banner: {
        height: '10em',
        margin: '0 5em'
    },
    bannerGrid: {
        height: '100%'
    },
    title: {
        fontWeight: 500
    }
  }));

const Banner = (props: any) => {
    const classes = useStyles();

    if (props.newProp) console.log(props.newProp)
    const contentPosition = props.contentPosition ? props.contentPosition : "left"
    const totalItems = props.length ? props.length : 2;
    const mediaLength = totalItems - 1;

    let items = [];
    console.log(props.item);
    const content = (
        <Grid item xs={6} key="content">
            <CardContent className="Content">
                <Typography className={classes.title}>
                    {props.item.Name}
                </Typography>
                <Typography className="Caption">
                    {props.item.Caption}
                </Typography>
                <Link 
                    component="a"
                    href={props.item.Items[0].href}
                    target="_blank"
                    rel="noopener"
                > 
                    View Now
                </Link>
            </CardContent>
        </Grid>
    )


    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item xs={6} key={item.Name}>
                <CardMedia style={{ height: '100%' }}
                    className="Media"
                    image={item.Image}
                    title={item.Name}
                />
            </Grid>
        )

        items.push(media);
    }

    if (contentPosition === "left") {
        items.unshift(content);
    } else if (contentPosition === "right") {
        items.push(content);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className={classes.banner}>
            <Grid container spacing={0} className={classes.bannerGrid}>
                {items}
            </Grid>
        </Card>
    )
}

const items = [
    {
        Name: "Forbes",
        Caption: "Robinhood Trader May Face $800,000 Tax Bill",
        contentPosition: "left",
        Items: [
            {
                Name: "Robinhood Trader May Face $800,000 Tax Bill",
                Image: "/images/Robinhoodtrader80000.jpg",
                href: 'https://www.forbes.com/sites/shaharziv/2021/03/26/robinhood-trader-may-face-800000-tax-bill/?sh=1749cc3867c7'
            }
        ]
    },
    {
        Name: "Robinhood Learn",
        Caption: "What is Capital Gains Tax?",
        contentPosition: "left",
        Items: [
            {
                Name: "What is Capital Gains Tax?",
                Image: "https://images.ctfassets.net/lnmc2aao6j57/6YJgDDTnhEX0tt2bzCCpFQ/9aa14b82dc822a4dd36850a4588fd3cc/What_is_an_investment.svg",
                href: "https://learn.robinhood.com/articles/5wHsfosatRkbi0EJgC6aRi/what-is-capital-gains-tax/"
            }
        ]
    },
    {
        Name: "Forbes",
        Caption: "Using Robinhood Could Cost You Thousands In Taxes, Here’s Why",
        contentPosition: "left",
        Items: [
            {
                Name: "Using Robinhood Could Cost You Thousands In Taxes, Here’s Why",
                Image: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F608c39c12b9d48435dfa0659%2F960x0.jpg%3Ffit%3Dscale",
                href: 'https://www.forbes.com/sites/shaharziv/2021/04/30/using-robinhood-could-costs-you-thousands-in-taxes-heres-why/?sh=6a1c84e914be'
            }
        ]
    },
    {
        Name: "NSCU.edu",
        Caption: "Robinhood and the Rise of Day Trading: What does it mean on your income taxes?",
        contentPosition: "left",
        Items: [
            {
                Name: "Robinhood and the Rise of Day Trading: What does it mean on your income taxes?",
                Image: "https://poole.ncsu.edu/thought-leadership/wp-content/uploads/sites/26/2021/02/shutterstock_1690759417.jpg",
                href: 'https://poole.ncsu.edu/thought-leadership/article/robinhood-and-the-rise-of-day-trading-what-does-it-mean-on-your-income-taxes/'
            }
        ]
    },
    {
        Name: "Rice University",
        Caption: "Could Robinhood debacle lead to ‘Robin Hood tax’?",
        contentPosition: "left",
        Items: [
            {
                Name: "Could Robinhood debacle lead to ‘Robin Hood tax’?",
                Image: "https://cpb-us-e1.wpmucdn.com/news-network.rice.edu/dist/c/2/files/2021/04/121472795_l-620x414.jpg",
                href: 'http://news.rice.edu/2021/04/02/could-robinhood-debacle-lead-to-robin-hood-tax-2/'
            }
        ]
    }
]


const ArticleCarousel = () => {

    return (
        <div style={{ margin: "50px 50px", color: "#494949" }}>
                <Carousel
                    className="Example"
                    autoPlay={true}
                    animation="slide"
                    indicators={true}
                    timeout={1500}
                    cycleNavigation={true}
                    navButtonsAlwaysVisible={true}
                >
                    {
                        items.map((item, index) => {
                            return <Banner item={item} key={index} contentPosition={item.contentPosition} />
                        })
                    }
                </Carousel>
            </div>
    )

}

export default ArticleCarousel