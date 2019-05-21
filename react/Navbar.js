class Navbar extends React.Component {
    state = {
        loading: false,
        cartScale: false,
        registerScale: false,
        signInScale: false,
        hamburgerHeight: false,
        isLogin: false,
        //register input
        inputEmailRegister: '',
        inputPasswordRegister: '',
        inputNameRegister: '',
        inputPhoneRegister: '',
        //sign in input,
        inputEmailSignin: '',
        inputPasswordSignin: '',
        //profile
        profileScale: false,
        username: ''
    }

    componentDidMount() {
        this.onStateChange();
    }

    onStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ username: firebase.auth().currentUser.displayName, isLogin: true, profileScale: false, inputEmailSignin: '', inputPasswordSignin: '', inputNameRegister: '', inputPhoneRegister: '' });
            } else {
                this.setState({ isLogin: false });
            }
        });
    };

    registerOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            inputEmailSignin: '',
            inputPasswordSignin: ''
        })
    };

    submitRegister = (e) => {
        e.preventDefault();
        if (this.state.inputEmailRegister === '' || this.state.inputPasswordRegister === '' || this.state.inputNameRegister === '' || this.state.inputPhoneRegister === '') {
            alert('All field must be filled');
        } else {
            this.setState({ loading: true });
            firebase.auth().createUserWithEmailAndPassword(this.state.inputEmailRegister, this.state.inputPasswordRegister)
                .then(() => {
                    var user = firebase.auth().currentUser;
                    user.updateProfile({
                        displayName: this.state.inputNameRegister
                    });
                    this.setState({ loading: false, username: this.state.inputNameRegister });
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    this.setState({ loading: false });
                    alert(errorCode, errorMessage);
                });
        }
    };

    signInOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            inputEmailRegister: '',
            inputPasswordRegister: '',
            inputNameRegister: '',
        })
    };

    submitSignin = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const { inputEmailSignin, inputPasswordSignin } = this.state;
        firebase.auth().signInWithEmailAndPassword(inputEmailSignin, inputPasswordSignin)
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((error) => {
                this.setState({ loading: false });
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorCode, errorMessage);
            });
    };

    render() {
        return (
            <>
                {this.state.isLogin ? <div className="welcomeUser" style={{
                    position: 'absolute',
                    left: 0,
                    top: -50,
                    right: 0,
                    background: '#598c5f',
                    zIndex: 10000,
                    textAlign: 'center',
                    padding: '10px 0'
                }}>
                    <p style={{ color: '#fff' }}>Welcome {this.state.username}</p>
                </div> : null}

                <header className="header1">

                    <div className="container-menu-header">
                        <div className="topbar">
                            <div className="topbar-social">
                                <a href="#" className="topbar-social-item fa fa-facebook"></a>
                                <a href="https://www.instagram.com/yougane.id" target="_blank"
                                    className="topbar-social-item fa fa-instagram"></a>

                            </div>



                            <div className="topbar-child2">
                                <span className="topbar-email">
                                    youganeid@gmail.com
                                </span>

                            </div>
                        </div>

                        <div className="wrap_header">

                            <a href="index.html" className="logo">
                                <img src="images/icons/logo.png" alt="IMG-LOGO" />
                            </a>


                            <div className="wrap_menu">
                                <nav className="menu">
                                    <ul className="main_menu">
                                        <li>
                                            <a href="index.html">Home</a>

                                        </li>

                                        <li>
                                            <a href="product.html">Shop</a>
                                        </li>

                                        <li>
                                            <a href="about.html">About</a>
                                        </li>

                                        <li>
                                            <a href="contact.html">Contact</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>


                            <div className="header-icons">
                                {this.state.isLogin ?
                                    <>
                                        <p onClick={() => {
                                            this.state.profileScale ? this.setState({ profileScale: false }) : this.setState({ profileScale: true, cartScale: false })
                                        }} className="header-wrapicon1 dis-block">
                                            <img src="images/icons/icon-header-01.png" className="header-icon1" alt="ICON" />
                                        </p>
                                        <span className="linedivide1"></span>
                                        <div className="profilePage" style={{ transform: `scale(${this.state.profileScale ? '1' : '0'})` }}>
                                            <p>Profile</p>
                                            <button onClick={() => firebase.auth().signOut()} className='signoutBtn'>SIGN OUT</button>
                                        </div>
                                    </>
                                    : (
                                        <>
                                            <p
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    this.state.registerScale ? this.setState({ registerScale: false }) : this.setState({ registerScale: true, cartScale: false, signInScale: false })
                                                }}>REGISTER</p>

                                            <span className="linedivide1"></span>

                                            <div className="registerPage" style={{ transform: `scale(${this.state.registerScale ? '1' : '0'})` }}>
                                                {this.state.loading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
                                                    <p>Create an account</p>}
                                                <form onSubmit={this.submitRegister}>
                                                    <input type="text" placeholder="Email"
                                                        value={this.state.inputEmailRegister}
                                                        name='inputEmailRegister'
                                                        onChange={this.registerOnChange} />
                                                    <input type="password" placeholder="Password"
                                                        value={this.state.inputPasswordRegister}
                                                        name='inputPasswordRegister'
                                                        onChange={this.registerOnChange} />
                                                    <input type="text" placeholder="Name"
                                                        value={this.state.inputNameRegister}
                                                        name='inputNameRegister'
                                                        onChange={this.registerOnChange} />
                                                    <input type="number" placeholder="Phone"
                                                        value={this.state.inputPhoneRegister}
                                                        name='inputPhoneRegister'
                                                        onChange={this.registerOnChange} />
                                                    <button>Register</button>
                                                </form>
                                            </div>

                                            <p
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    this.state.signInScale ? this.setState({ signInScale: false }) : this.setState({ signInScale: true, cartScale: false, registerScale: false })
                                                }}>SIGN IN</p>

                                            <span className="linedivide1"></span>

                                            <div className="registerPage" style={{ transform: `scale(${this.state.signInScale ? '1' : '0'})` }}>
                                                {this.state.loading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
                                                    <p>Sign in to your account</p>}

                                                <form onSubmit={this.submitSignin}>
                                                    <input type="text" placeholder="Email"
                                                        value={this.state.inputEmailSignin}
                                                        name='inputEmailSignin'
                                                        onChange={this.signInOnChange} />
                                                    <input type="password" placeholder="Password"
                                                        value={this.state.inputPasswordSignin}
                                                        name='inputPasswordSignin'
                                                        onChange={this.signInOnChange} />
                                                    <button>Sign in</button>
                                                </form>
                                            </div>
                                        </>
                                    )}




                                <div className="header-wrapicon2" onClick={() => {
                                    this.state.cartScale ? this.setState({ cartScale: false }) : this.setState({ cartScale: true, registerScale: false, signInScale: false, profileScale: false })
                                }}>
                                    <img src="images/icons/icon-header-02.png" className="header-icon1 js-show-header-dropdown"
                                        alt="ICON" />
                                    <span className="header-icons-noti">0</span>


                                    <div className="header-cart" style={{ transform: `scale(${this.state.cartScale ? '1' : '0'})` }}>
                                        <ul className="header-cart-wrapitem">
                                            <li className="header-cart-item">
                                                <div className="header-cart-item-img">
                                                    <img src="images/item-cart-01.jpg" alt="IMG" />
                                                </div>

                                                <div className="header-cart-item-txt">
                                                    <a href="#" className="header-cart-item-name">
                                                        White Shirt With Pleat Detail Back
                                                     </a>

                                                    <span className="header-cart-item-info">
                                                        1 x $19.00
                                                     </span>
                                                </div>
                                            </li>

                                            <li className="header-cart-item">
                                                <div className="header-cart-item-img">
                                                    <img src="images/item-cart-02.jpg" alt="IMG" />
                                                </div>

                                                <div className="header-cart-item-txt">
                                                    <a href="#" className="header-cart-item-name">
                                                        Converse All Star Hi Black Canvas
                                </a>

                                                    <span className="header-cart-item-info">
                                                        1 x $39.00
                                </span>
                                                </div>
                                            </li>

                                            <li className="header-cart-item">
                                                <div className="header-cart-item-img">
                                                    <img src="images/item-cart-03.jpg" alt="IMG" />
                                                </div>

                                                <div className="header-cart-item-txt">
                                                    <a href="#" className="header-cart-item-name">
                                                        Nixon Porter Leather Watch In Tan
                                </a>

                                                    <span className="header-cart-item-info">
                                                        1 x $17.00
                                </span>
                                                </div>
                                            </li>
                                        </ul>

                                        <div className="header-cart-total">
                                            Total: $75.00
                    </div>

                                        <div className="header-cart-buttons">
                                            <div className="header-cart-wrapbtn">

                                                <a href="cart.html" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                                    View Cart
                            </a>
                                            </div>

                                            <div className="header-cart-wrapbtn">

                                                <a href="#" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                                    Check Out
                            </a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Header Mobile --> */}
                    <div className="wrap_header_mobile">
                        {/* <!-- Logo moblie --> */}
                        <a href='./index.html'
                            className="logo-mobile">
                            <img src="images/icons/logo.png" alt="IMG-LOGO" />
                        </a>




                        {/* <!-- Button show menu --> */}
                        <div className="btn-show-menu">
                            {/* <!-- Header Icon mobile --> */}
                            <div className="header-icons-mobile">

                                <span className="linedivide2"></span>

                                <div className="header-wrapicon2" onClick={() => {
                                    this.state.cartScale ? this.setState({ cartScale: false }) : this.setState({ cartScale: true, registerScale: false, signInScale: false })
                                }}>
                                    <img src="images/icons/icon-header-02.png" className="header-icon1 js-show-header-dropdown"
                                        alt="ICON" />
                                    <span className="header-icons-noti">0</span>

                                    {/* <!-- Header cart noti --> */}
                                    <div className="header-cart" style={{ transform: `scale(${this.state.cartScale ? '1' : '0'})` }}>
                                        <ul className="header-cart-wrapitem">
                                            <li className="header-cart-item">
                                                <div className="header-cart-item-img">
                                                    <img src="images/item-cart-01.jpg" alt="IMG" />
                                                </div>

                                                <div className="header-cart-item-txt">
                                                    <a href="#" className="header-cart-item-name">
                                                        White Shirt With Pleat Detail Back
                    </a>

                                                    <span className="header-cart-item-info">
                                                        1 x $19.00
                    </span>
                                                </div>
                                            </li>

                                            <li className="header-cart-item">
                                                <div className="header-cart-item-img">
                                                    <img src="images/item-cart-02.jpg" alt="IMG" />
                                                </div>

                                                <div className="header-cart-item-txt">
                                                    <a href="#" className="header-cart-item-name">
                                                        Converse All Star Hi Black Canvas
                    </a>

                                                    <span className="header-cart-item-info">
                                                        1 x $39.00
                    </span>
                                                </div>
                                            </li>

                                            <li className="header-cart-item">
                                                <div className="header-cart-item-img">
                                                    <img src="images/item-cart-03.jpg" alt="IMG" />
                                                </div>

                                                <div className="header-cart-item-txt">
                                                    <a href="#" className="header-cart-item-name">
                                                        Nixon Porter Leather Watch In Tan
                    </a>

                                                    <span className="header-cart-item-info">
                                                        1 x $17.00
                    </span>
                                                </div>
                                            </li>
                                        </ul>

                                        <div className="header-cart-total">
                                            Total: $75.00
        </div>

                                        <div className="header-cart-buttons">
                                            <div className="header-cart-wrapbtn">
                                                {/* <!-- Button --> */}
                                                <a href="cart.html" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                                    View Cart
                </a>
                                            </div>

                                            <div className="header-cart-wrapbtn">
                                                {/* <!-- Button --> */}
                                                <a href="#" className="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                                                    Check Out
                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="btn-show-menu-mobile hamburger hamburger--squeeze" onClick={() => {
                                this.state.hamburgerHeight ? this.setState({ hamburgerHeight: false }) : this.setState({ hamburgerHeight: true, registerScale: false, cartScale: false, signInScale: false })
                            }}>
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Menu Mobile --> */}
                    <div className="wrap-side-menu" style={{ height: `${this.state.hamburgerHeight ? '300px' : 0}` }}>
                        <nav className="side-menu">
                            <ul className="main-menu">
                                <li className="item-topbar-mobile p-l-20 p-t-8 p-b-8">
                                    <div className="topbar-child2-mobile">
                                        <span className="topbar-email">
                                            fashe@example.com
        </span>
                                    </div>
                                </li>

                                <li className="item-topbar-mobile p-l-10">
                                    <div className="topbar-social-mobile">
                                        <a href="#" className="topbar-social-item fa fa-facebook"></a>
                                        <a href="#" className="topbar-social-item fa fa-instagram"></a>
                                    </div>
                                </li>

                                <li className="item-menu-mobile">
                                    <a href="index.html">Home</a>
                                    <i className="arrow-main-menu fa fa-angle-right" aria-hidden="true"></i>
                                </li>

                                <li className="item-menu-mobile">
                                    <a href="product.html">Shop</a>
                                </li>

                                <li className="item-menu-mobile">
                                    <a href="about.html">About</a>
                                </li>

                                <li className="item-menu-mobile">
                                    <a href="contact.html">Contact</a>
                                </li>

                                {this.state.isLogin ? <li className="item-menu-mobile signoutmobile">
                                    <p onClick={() => firebase.auth().signOut()}>SIGN OUT</p>
                                </li> : null}
                            </ul>
                        </nav>
                    </div>
                </header>
            </>
        );
    }
}

ReactDOM.render(
    <Navbar />,
    document.getElementById('navbar')
);





