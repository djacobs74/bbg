new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		enemyHealth: 0,
		timer: 50,
		zombieType: 'No',
		room: 0,
		betaComponents: 0,
		beta_b: 0,
		beta_e: 0,
		beta_t: 0,
		beta_a: 0,
		beta_u: 0,
		searchChance: 100,
		medPacks: 0,
		virusPatch: 0,
		turns: [],
		chanceText: '',
		summon_dermajicker: 'false',
		game_win: '',
		dm_dead: 'false',
		points: 0,
	},
	methods: {
		phillipAttack: function() {
			var damage = this.numberGenerator(20, 40);
			var deal_a_b_z = 'You deal ' + damage + ' damage to ' + this.zombieType + ' Zombie'
			var deal_d_m = 'You deal ' + damage + ' damage to ' + this.zombieType
			var dead_a_b_z = 'You deal ' + damage + ' damage and kill ' + this.zombieType + ' Zombie!!'
			var dead_d_m = 'You deal ' + damage + ' damage and kill ' + this.zombieType + ' !!'
			if (this.zombieType != 'No' && this.zombieType != 'Der Majicker') {
				this.enemyHealth -= damage;
				

				if (this.enemyHealth <= 0) {
					this.turns.unshift({
		                isPlayer: true,
		                text: dead_a_b_z 
		            });
				} else if (this.zombieType != 'Der Majicker') {
					this.turns.unshift({
		                isPlayer: true,
		                text: deal_a_b_z 
		            });
		            this.enemyAttacks();
		        } 
		        this.turnCounter();
	            
			} else if (this.zombieType === 'Der Majicker') {
				this.enemyHealth -= damage;
			

				if (this.enemyHealth <= 0) {
					this.turns.unshift({
		                isPlayer: true,
		                text: dead_d_m 
		            });
		            this.dm_dead = 'true';
				} else {
					this.turns.unshift({
		                isPlayer: true,
		                text: deal_d_m 
		            });
		            this.enemyAttacks();
		        }
				this.turnCounter();
			}
		
			this.zombieDead();

		},
		enemyAttacks: function() {
			var damage = 0;
			if (this.zombieType == 'Alpha') {
				damage = this.numberGenerator(3, 6);
			} else if (this.zombieType == 'Beta') {
				damage = this.numberGenerator(5, 10);
			} else if (this.zombieType == 'Zed') {
				damage = this.numberGenerator(8, 12);
			} else if (this.zombieType == 'Der Majicker') {
				damage = this.numberGenerator(15, 20);
			} 

			this.playerHealth -= damage;

			if (this.zombieType != 'Der Majicker') {
				this.turns.unshift({
		                isPlayer: false,
		                text: this.zombieType + ' Zombie deals ' + damage + ' damage to you!'
		            });
			} else {
				this.turns.unshift({
	                isPlayer: false,
	                text: this.zombieType + ' deals ' + damage + ' damage to you!'
	            });
			}

			this.game_over();

		},
        turnCounter: function() {
        	this.timer -= 1;
        	this.win_check();

        },
        useMedpack: function() {
        	if (this.zombieType == 'No' && this.playerHealth < 100 && this.medPacks >= 1) {
	        	var heal = this.numberGenerator(10, 20);
	        	this.playerHealth += heal;
	        	if (this.playerHealth > 100) {
	        		this.playerHealth = 100;
	        	} else {
	        		this.playerHealth;
	        	}
	        	
	        	this.medPacks -= 1;
	        	this.turns.unshift({
	                isHeal: true,
	                text: 'You use a medpack and heal for ' + heal + ' health'
	            });
	            this.turnCounter();
	        }
        },
        numberGenerator: function(min, max) {
        	return Math.max(Math.floor(Math.random() * max) + 1, min);
    
        },
        move: function() {
        	var zombieType = '';
        	var zombieHealth = '';

        	if (this.zombieType === 'No') {

	        	result = this.numberGenerator(1, 12);
	        	if (result >= 1 && result <= 3) {
	        		zombieType = 'Alpha';
	        		zombieHealth = 25;
	        	} else if (result >= 3 && result <= 6) {
	        		zombieType = 'Beta';
	        		zombieHealth = 50;
	        	} else if (result >= 7 && result <= 9) {
	        		zombieType = 'Zed';
	        		zombieHealth = 75;
	        	} else {
	        		zombieType = 'No';
	        	}
	        	this.zombieType = zombieType;
	        	this.enemyHealth = zombieHealth;
	        	this.room += 1;
	        	
	        	this.searchChance = 100;
	        	this.turns.unshift({
	                isMove: true,
	                text: 'You move into a new Room. ' + zombieType + ' Zombie in here!'
	            });
	            this.turnCounter();
	        }
	        this.chances();
        },
        zombieDead: function() {
        	if (this.enemyHealth <= 0) {
        		this.zombieType = 'No';
        		
        	}
		},
		searchRoom: function() {
			var searches_left = 0;
			if (this.searchChance == 100) {
				searches_left = 3;
			} else if (this.searchChance == 75) {
				searches_left = 2;
			} else if (this.searchChance == 50) {
				searches_left = 1;
			} else if (this.searchChance == 25) {
				searches_left = 0;
			}
			

			if (this.zombieType == 'No' && this.room != 0 && this.searchChance > 0) {
				betaComp = (this.numberGenerator(1, 10) + searches_left);
				meds     = (this.numberGenerator(1, 10) + searches_left);
				patch    = (this.numberGenerator(1, 10) + searches_left);
				if (betaComp >= 9 && betaComp <= 13) {
					this.betaComponents += 1;
					this.betaType();
				}
				if (this.medPacks < 3) {
					if (meds >= 9 && meds <= 13) {
						this.medPacks += 1;
					}
				}
				if (this.virusPatch < 1) {
					if (patch >= 9 && patch <= 13) {
						this.virusPatch += 1;
					}
				}
				
				this.searchChance -= 25;
				this.chances();
				this.betaCheck();
				this.betaUniversal();
				this.turnCounter();
			}
		},
		rest: function() {
        	if (this.zombieType == 'No' && this.playerHealth < 100) {
	        	var heal = this.numberGenerator(4, 8);
	        	this.playerHealth += heal;
	        	if (this.playerHealth > 100) {
	        		this.playerHealth = 100;
	        	} else {
	        		this.playerHealth;
	        	}
	        	
	        	this.turns.unshift({
	                isRest: true,
	                text: 'You rest and heal for ' + heal + ' health'
	            });
	            this.turnCounter();
	        }
        },
        patchZombie: function() {
        	var his_her = '';
        	var result = this.numberGenerator(1, 2);
        	if (result == 1) {
        		his_her = 'his';
        	} else {
        		his_her = 'her'
        	}

			if (this.zombieType != 'No' && this.zombieType != 'Der Majicker' && this.virusPatch == 1) {
				
				this.turns.unshift({
	                isPatched: true,
	                text: 'You patched a ' + this.zombieType + ' zombie! The Giantcorp employee thanks you and runs for ' + his_her + ' life!' 
	            });
	            this.zombieType = 'No';
	            this.virusPatch -= 1;
	            this.turnCounter();
			} 

		},
		chances: function() {
			if (this.searchChance == 100) {
				this.chanceText = ' Excellent!'
			} else if (this.searchChance == 75) {
				this.chanceText = ' Not Bad.'
			} else if (this.searchChance == 50) {
				this.chanceText = ' Could Be Better.'
			} else if (this.searchChance == 25) {
				this.chanceText = ' Not Great . . .'
			}
		},
		betaType: function() {
			result = this.numberGenerator(1, 4);
			if (result == 1) {
				this.beta_b += 1;
			} else if (result == 2) {
				this.beta_e += 1;
			} else if (result == 3) {
				this.beta_t += 1;
			} else {
				this.beta_a += 1;
			}
			console.log('betaType result = ' + result);
		},
		betaCheck: function() {
			var beta_b_true = 0
			var beta_e_true = 0
			var beta_t_true = 0
			var beta_a_true = 0
			
			if (this.beta_b > 0) {
				beta_b_true = 1;
			}
			if (this.beta_e > 0) {
				beta_e_true = 1;
			}
			if (this.beta_t > 0) {
				beta_t_true = 1;
			}
			if (this.beta_a > 0) {
				beta_a_true = 1;
			}
			var beta_add = (beta_b_true + beta_e_true + beta_t_true + beta_a_true)
			if (this.game_win == '') {
				if (this.beta_b > 0 && this.beta_e > 0 && this.beta_t > 0 && this.beta_a > 0) {
					this.summon_dermajicker = 'true';
				} else if (beta_add == 3 && this.beta_u == 1) {
					this.summon_dermajicker = 'true';
				}
				else {
					this.summon_dermajicker = 'false';
				}
				console.log('beta check ' + this.summon_dermajicker);
				console.log('beta add = ' + beta_add);
			}
		},
		use_beta: function() {
			if (this.zombieType == 'No' && this.summon_dermajicker == 'true') {
				this.zombieType = 'Der Majicker';
				this.zombieHealth = 100;
				this.enemyHealth = 100;
				this.summon_dermajicker = 'false';
			}		
		},
		betaUniversal: function() {
			if (this.beta_u == 0) {
				result = this.numberGenerator(1, 20);
				if (result == 1) {
					this.beta_u +=1;
				}
			}
				
		},
		start_game: function() {
			$('.game-off').hide();
			$('.game-on').show();
		},
		game_over: function() {
			if (this.playerHealth <= 0) {
				this.turns.unshift({
	                isPlayer: false,
	                text: 'You have been turned into a Zombie! All hope is lost . . Der Majicker' + "'s" + ' virus is unleashed upon the world!'
	            });
	 			this.playerHealth = '0';
	 			this.game_win = 'false';
			}
		},
		start_new: function() {
			location.reload();
		},
		win_check: function() { //run this function somewhere above
			if (this.timer === 0) {
				if (this.dm_dead === 'true') {
					this.game_win = 'true';	
				} else if (this.dm_dead === 'false') {
					this.game_win = 'false';	
				}
			} else if (this.timer > 0) {
				if (this.dm_dead === 'true') {
					this.game_win = 'true';	
				} 
			}
			this.points = this.playerHealth + this.timer + this.betaComponents;
				 
			console.log('win check = ' + this.game_win);
		},

	},

})

