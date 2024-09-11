import './ContentBanner.css';
import { globalYoutubeLink, globalSearchOutput, globalUsername, globalVideoIcon, globalloginButton, globalstartButton} from '../../Khoros_entry_point/khoros_variables';
import { useState } from 'react';

function decodeHtmlEntities(encodedString) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}

function BannerPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    let links = [];

    try {
        const decodedLink = decodeHtmlEntities(globalYoutubeLink);
        links = typeof decodedLink === 'string' ? JSON.parse(decodedLink) : decodedLink;
    } catch (error) {
        console.error('Error parsing globalYoutubeLink:', error);
    }

    console.log('Parsed links:', links);

    // const pageoneUrl = links[0]?.pageone?.url || '/';
    const pagetwoUrl = links[1]?.pagetwo?.url || '/';
    const youtubeUrl = links[1]?.youtube?.url || '/';
    const pagethreeUrl = links[2]?.pagethree?.url || '/';
    const pagefourUrl = links[3]?.pagefour?.url || '/';
    const thumbnail = links[1]?.youtube?.thumbnail || '/';
    // const startconversation = links[1]?.youtube?.startaconversation || '/';

    // const handleLogin = () => {
    //     window.location.href = pageoneUrl;
    // };
    // const handleConversation = () => {
    //     window.location.href = startconversation;
    // };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        {LITHIUM.CommunityJsonObject.User.isAnonymous && (
                <div className='thumbnail'>
                    <div className='playbutton'>
                         <span onClick={openModal} ><img src={globalVideoIcon} alt='playbutton'/></span>
                    </div>
                    <img src={thumbnail} alt="Thumbnail" className='image-thumbnail' />
                </div>
            )}
            <section className='banner-page'>
                <div className='hero-banner'>
                    {!LITHIUM.CommunityJsonObject.User.isAnonymous ? (
                        <>
                            <h1>Welcome back, {globalUsername}!</h1>
                            <p>Welcome to Toast Community. Find answers, ask questions, and share <br /> successes with your industry peers.</p>

                            <div className="search-login">
                                <div className="search-bar">
                                    <div id='searchContainer'>
                                        {globalSearchOutput}
                                    </div>
                                </div>
                                <span>or</span>
                                <div id='conversation-button'>
                                    {globalstartButton}
                                </div>
                            </div>

                            <p className="product-links">
                                <span><span className='product-text'>Looking for more on our product? </span><a href={pagethreeUrl}>Product Hub</a> or <a href={pagefourUrl}>Test Kitchen</a></span>
                            </p>
                        </>
                    ) : (
                        <>
                            <h1>Connect with restaurants like yours</h1>
                            <p>Learn and network from your industry peers through this exclusive <br/> community for Toast customers.</p>

                            <div className="search-login">
                                <div className="search-bar">
                                    <div id='searchContainer'>
                                        {globalSearchOutput}
                                    </div>
                                </div>
                                <span>or</span>
                                <button className="login-button" id='login-button'>
                                     {globalloginButton}
                                </button>
                            </div>
                            <p className="insight-link">Not a Toast customer? <a href={pagetwoUrl}>Explore industry insights →</a></p>
                        </>
                    )}
                </div>
            </section>

            

            {isModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close-button' onClick={closeModal}>&times;</span>
                        <iframe
                            src={youtubeUrl}
                            title="Video Modal"
                            width="100%"
                            height="100%"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
}

export default BannerPage;
