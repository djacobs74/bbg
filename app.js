new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		enemyHealth: 100,
		turns: 10,
	},
	methods: {
		phillipAttack: function() {
			var damage = this.calculateDamage(5, 10);
			this.enemyHealth -= damage;
			this.enemyAttacks();
			this.turnCounter();
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
        	var heal = this.calculateHeal(4, 10);
        	this.playerHealth += heal;
        	if (this.playerHealth > 100) {
        		this.playerHealth = 100;
        	} else {
        		this.playerHealth;
        	}
        	this.turnCounter();
        }
	}
})

