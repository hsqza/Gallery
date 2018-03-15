import React, { Component } from 'react';
import classes from './Gallery.css';
import axios from '../axios';
import Photo from '../components/Photo/Photo';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from '../components/UI/Spinner/Spinner';

class Gallery extends Component {

    state = {
        gallery: [],
        hasMoreItems: true,
        apiKey: '11e6bdf4955c1a75fad2b8399d9d76d9',
        perPage: 12,
        error: null,
        details: []
    }


    loadPhotos() {

        axios.get('?method=flickr.photos.search&api_key=' + this.state.apiKey + '&text=dogs&per_page=' + this.state.perPage + '&format=json&nojsoncallback=1')
            .then(response => {
                const perPage = this.state.perPage;
                const newPage = perPage + 12;
                this.setState({gallery: response.data.photos.photo, perPage: newPage});
            })
            .catch(error => {
                this.setState({hasMoreItems: false, loading: true, error: error})
            })

    }

    getCurrentPhoto = (id, secret) => {

        axios.get('?method=flickr.photos.getInfo&api_key=' + this.state.apiKey + '&photo_id=' + id + '&secret=' + secret + '&format=json&nojsoncallback=1&')
            .then(res => {
                const id = res.data.photo.id;
                const name = res.data.photo.owner.username;
                const date = res.data.photo.dates.taken;
                const description = res.data.photo.description._content;

                const container = [id, name, date, description]

                this.setState({details: container});
            })
    }

    render() {

        let loader = <div key={0}><Spinner /></div>;
        let photos = <p className={classes.Error}>Something went wrong!</p>
       

        if (!this.state.loading) {
            photos = this.state.gallery.map(photo => (
                <Photo 
                    key={photo.id}
                    author={photo.owner}
                    img={'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg' }
                    id={photo.id}
                    detail={() => this.getCurrentPhoto(photo.id, photo.secret)} />
            ));
            
        }

        return(
            <section className={classes.Wrapper}>
                <h1>Gallery</h1>
                <InfiniteScroll
                    loadMore={() => this.loadPhotos()}
                    hasMore={this.state.hasMoreItems}
                    threshold={50}
                    loader={loader}>
                    <div className={classes.Gallery}>
                        {photos}
                    </div>
                </InfiniteScroll>
            </section>
        )
    }
}

export default Gallery;