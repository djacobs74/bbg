new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		enemyHealth: 0,
		turns: 20,
		zombieType: 'None',
		room: 1,
		betaComponents: 0,
		searchChance: '',
	},
	methods: {
		phillipAttack: function() {
			if (this.zombieType != 'None') {
				var damage = this.calculateDamage(20, 40);
				this.enemyHealth -= damage;
				this.enemyAttacks();
				this.turnCounter();
				this.zombieDead();
			}
		},
		enemyAttacks: function() {
			var damage = this.calculateDamage(3, 10);
			this.playerHealth -= damage;

		},
		calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        calculateHeal: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        turnCounter: function() {
        	this.turns -= 1;

        },
        phillipHeal: function() {
        	if (this.zombieType == 'None' && this.playerHealth < 100) {
	        	var heal = this.calculateHeal(4, 10);
	        	this.playerHealth += heal;
	        	if (this.playerHealth > 100) {
	        		this.playerHealth = 100;
	        	} else {
	        		this.playerHealth;
	        	}
	        	this.turnCounter();
	        }
        },
        numberGenerator: function(min, max) {
        	return Math.max(Math.floor(Math.random() * max) + 1, min);
    
        },
        move: function() {
        	var zombieType = '';
        	var zombieHealth = '';

        	if (this.zombieType === 'None') {

	        	result = this.numberGenerator(1, 12);
	        	if (result >= 1 && result <= 3) {
	        		zombieType = 'Alpha';
	        		zombieHealth = 50;
	        	} else if (result >= 3 && result <= 6) {
	        		zombieType = 'Beta';
	        		zombieHealth = 75;
	        	} else if (result >= 7 && result <= 9) {
	        		zombieType = 'Zed';
	        		zombieHealth = 100;
	        	} else {
	        		zombieType = 'None';
	        	}
	        	this.zombieType = zombieType;
	        	this.enemyHealth = zombieHealth;
	        	this.room += 1;
	        	this.turnCounter();
	        }
        },
        zombieDead: function() {
        	if (this.enemyHealth <= 0) {
        		this.zombieType = 'None';
        	}
		},
		searchRoom: function() {
			if (this.zombieType == 'None' && this.room != 1) {
				result = this.numberGenerator(1, 12);
				if (result >= 1 && result <= 3) {
					this.betaComponents += 1;
				} 
				this.turnCounter();
			}
		}
	},

})

